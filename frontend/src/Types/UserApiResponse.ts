export interface UserApiResponse {
  message: string;
  user: {
    id: string;
    nickName: string | null;
    fullName: string | null;
    email: string | null;
    avatar: string | null;
    gender: string | null;
    birthday: string | null;
    phoneNumber: string | null;
    verified: boolean;
    role: string;
    provider: string | null;
  };
}