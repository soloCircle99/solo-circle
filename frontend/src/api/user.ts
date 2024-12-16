import axios from "./api"

const path = "/user";

const get = async () => axios.get(`${path}/getUserData`);

const userApi = { get }

export default userApi