import { UserApiResponse } from "../Types/UserApiResponse";
import axios from "./api"

const path = "/user";

const get = async (): Promise<UserApiResponse> => axios.get(`${path}/getUserData`);

const userApi = { get }

export default userApi