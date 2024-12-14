import { Request, Response } from "express"
import { prisma } from "../prisma-client.js"
import { X_OAUTH2_BASEURL, X_SCOPES, X_TOKEN_BASEURL } from "../utils/constant.js"
import querystring from "querystring"
import { ParsedQs } from 'qs';
import axios from "axios"
import { generateCodeChallenge, generateCodeVerifier } from "../utils/crypto.js"
import { mapUserDetails } from "../utils/Mapper/x.js";

const XLogin = async (req: Request, res: Response) => {
  try {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const params = {
      'client_id': process.env.X_CLIENT_ID,
      'redirect_uri': process.env.X_REDIRECT_URI,
      'response_type': 'code',
      'scope': X_SCOPES.join(' '),
      'state': codeVerifier,
      'code_challenge': codeChallenge,
      'code_challenge_method': 'S256'
    };

    const url = `${X_OAUTH2_BASEURL}?${querystring.stringify(params)}`;

    res.status(200).redirect(url)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const XCallback = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const { state: code_verifier, code, error } = req.query as ParsedQs & { state: string; code: string; scope: string, error: string };

    if (error) {
      res.status(400).json({ message: error })
      return
    }

    if (!code) {
      res.status(401).json({ message: "Unauthorized request" })
      return
    }

    const base64Credentials = Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64');

    const data = {
      code,
      code_verifier,
      'redirect_uri': process.env.X_REDIRECT_URI,
      'grant_type': 'authorization_code',
    };

    const tokenResponse = await axios.post(X_TOKEN_BASEURL, querystring.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
      },
    });

    const { access_token, expires_in, refresh_token } = tokenResponse.data

    const userDetails = await axios.get(`https://api.x.com/2/users/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      params: {
        'user.fields': 'created_at,description,entities,id,location,most_recent_tweet_id,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,verified_type,withheld',
      }
    })

    const user = mapUserDetails(userDetails?.data?.data || null);

    //TODO: store user details in db

    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { XLogin, XCallback }