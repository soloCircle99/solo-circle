import { Request, Response } from "express"
import { prisma } from "../prisma-client.js"
import { FACEBOOK_OAUTH_BASEURL, FACEBOOK_SCOPES, FACEBOOK_TOKEN_BASEURL } from "../utils/constant.js"
import querystring from "querystring"
import { v4 as uuidv4 } from "uuid"
import { ParsedQs } from 'qs';
import axios from "axios"
import { decrypt, encrypt } from "../utils/crypto.js"
import { mapUserDetails } from "../utils/Mapper/facebook.js"
import { generateAccessToken } from "../utils/generateAccessToken.js"

const facebookLogin = async (req: Request, res: Response) => {
    try {
        const params = {
            'client_id': process.env.FACEBOOK_APP_ID,
            'redirect_uri': process.env.FACEBOOK_REDIRECT_URI,
            'response_type': 'code',
            'scope': FACEBOOK_SCOPES.join(' '),
            'state': uuidv4().toString(),
        };

        const url = `${FACEBOOK_OAUTH_BASEURL}?${querystring.stringify(params)}`;

        const authToken = encrypt(params.state)
        const option = { httpOnly: true, secure: process.env.NODE_ENV === "develpoment", expires: new Date(Date.now() + (1000 * 60 * 2)) }
        res.cookie("auth_token", authToken, option)

        res.status(200).redirect(url)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const facebookCallback = async (req: Request, res: Response) => {
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
            'client_id': process.env.FACEBOOK_APP_ID,
            'client_secret': process.env.FACEBOOK_APP_SECRET,
            'redirect_uri': process.env.FACEBOOK_REDIRECT_URI,
        };

        const tokenResponse = await axios.get(FACEBOOK_TOKEN_BASEURL, { params: data });
        const { access_token, expires_in } = tokenResponse.data

        const userDetails = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,gender,birthday,picture`, { params: { access_token } })

        const user = mapUserDetails(userDetails?.data);

        const user_details = await prisma.user.upsert({
            where: { providerId: user.providerId },
            create: {
                ...user,
                provider: "FACEBOOK",
                accessToken: access_token,
                expires_in: new Date(Date.now() + expires_in * 1000),
            },
            update: {
                ...(user.fullName && { fullName: user.fullName }),
                ...(user.email && { email: user.email }),
                ...(user.gender !== null && { gender: user.gender }),
                ...(user.birthday && { birthday: user.birthday }),
                ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
                ...(user.avatar && { avatar: user.avatar }),
                verified: user.verified,
                accessToken: access_token,
                expires_in: new Date(Date.now() + expires_in * 1000),
            },
        });

        const userAccessToken = generateAccessToken(user_details)

        const option = { httpOnly: true, secure: process.env.NODE_ENV === "develpoment", expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) }
        res.cookie("access_token", userAccessToken, option)

        res.status(200).redirect(`/login?email=${user_details.email}&uid=${user_details.id}`)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export { facebookLogin, facebookCallback }