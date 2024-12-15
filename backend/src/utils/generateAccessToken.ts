import jwt from "jsonwebtoken"
import { Role, Provider } from '@prisma/client';

interface UserInterFace {
    id: string;
    nickName: string | null;
    fullName: string;
    email: string;
    avatar: string;
    gender?: string | null;
    birthday?: Date | null;
    phoneNumber?: string | null;
    verified: boolean;
    role: Role;
    provider: Provider;
    providerId: string;
    accessToken: string;
    expires_in: Date;
    refresh_token?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const generateAccessToken = function (user: UserInterFace) {
    return jwt.sign(
        {
            _id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "1d"
        }
    )
}

export { generateAccessToken, UserInterFace }