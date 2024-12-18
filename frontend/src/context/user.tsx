import { createContext, useContext } from "react";

export interface UserInterFace {
  user: {
    avatar: string | null;
    birthday: string | null;
    email: string | null;
    fullName: string | null;
    gender: string | null;
    id: string | null;
    nickName: string | null;
    phoneNumber: string | null;
    provider: string | null;
    role: string | null;
    verified: boolean;
  }
}

const UserContext = createContext<UserInterFace>({
  user: {
    nickName: null,
    fullName: null,
    email: null,
    avatar: null,
    gender: null,
    birthday: null,
    id: null,
    role: null,
    phoneNumber: null,
    provider: null,
    verified: false,
  },
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;