import { Request, Response } from "express"
import { prisma } from "../prisma-client.js"
import { GOOGLE_OAUTH2_BASEURL, GOOGLE_SCOPES, GOOGLE_TOKEN_BASEURL } from "../utils/constant.js"
import querystring from "querystring"
import { v4 as uuidv4 } from "uuid"
import { ParsedQs } from 'qs';
import axios from "axios"
import { decrypt, encrypt } from "../utils/crypto.js"
import { mapUserDetails } from "../utils/Mapper/google.js"

const googleLogin = async (req: Request, res: Response) => {
  try {
    const params = {
      'client_id': process.env.GOOGLE_CLIENT_ID,
      'redirect_uri': process.env.GOOGLE_REDIRECT_URI,
      'response_type': 'code',
      'scope': GOOGLE_SCOPES.join(' '),
      'access_type': 'offline',
      'prompt': 'consent',
      'include_granted_scopes': 'true',
      'state': uuidv4().toString(),
    };

    const url = `${GOOGLE_OAUTH2_BASEURL}?${querystring.stringify(params)}`;

    const authToken = encrypt(params.state)
    const option = { httpOnly: true, secure: process.env.NODE_ENV === "develpoment", expires: new Date(Date.now() + (1000 * 60 * 2)) }
    res.cookie("auth_token", authToken, option)

    res.status(200).redirect(url)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const googleCallback = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const { state, code, scope, error } = req.query as ParsedQs & { state: string; code: string; scope: string, error: string };
    const authToken = decrypt(req.cookies?.auth_token || null)

    if (error) {
      res.status(400).json({ message: error })
      return
    }

    if (!code || authToken !== state) {
      res.status(401).json({ message: "Unauthorized request" })
      return
    }

    const data = {
      code,
      'client_id': process.env.GOOGLE_CLIENT_ID,
      'client_secret': process.env.GOOGLE_CLIENT_SECRET,
      'redirect_uri': process.env.GOOGLE_REDIRECT_URI,
      'response_type': 'token',
      'grant_type': 'authorization_code'
    };

    const tokenResponse = await axios.post(GOOGLE_TOKEN_BASEURL, data);
    const { access_token, expires_in, refresh_token } = tokenResponse.data

    const userDetails = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,phoneNumbers,ageRanges,birthdays,genders,photos`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const user = mapUserDetails(userDetails?.data || null);

    //TODO: store user details in db

    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { googleLogin, googleCallback }