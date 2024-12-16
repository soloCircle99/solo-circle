import axios, { AxiosInstance, AxiosResponse } from "axios";
import { clearCredentialsFromLocalStorage, getValueFromLocalStorage } from "../helpers/storage";

const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      if (error.response?.status === 401) {
        clearCredentialsFromLocalStorage();
        setTimeout(() => (window.location.href = "/"), 500);
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const uid = getValueFromLocalStorage("authUid");
      const email = getValueFromLocalStorage("authEmail");
      const headers = {
        "X-Auth-Uid": uid,
        "X-Auth-Email": email,
      };

      const newConfig = {
        ...config,
        headers: {
          ...config.headers,
          ...headers,
        },
      };

      return newConfig;
    },
    (error: any) => Promise.reject(error)
  );
};

const createApiClient = () => {
  const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  setupInterceptors(axiosInstance);
  return axiosInstance;
};

const Api = createApiClient();

export default Api;