import axios, { AxiosRequestConfig } from "axios";
import { useSessionStorage } from "../hooks/useSessionStorage";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}`
});

instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] = "Authorized by John";

export default instance;

export const mongoInstance = axios.create({
  baseURL: `${API_URL}`
});
mongoInstance.defaults.headers.common["channelName"] = "Theodore's Channel";

mongoInstance.defaults.headers.common["Authorization"] = "Authorized by Theodore";

mongoInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessTokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";
    if (config.headers === undefined) {
      config.headers = {};
    }
    if (!config.headers["X-access-token"]) {
      config.headers["X-access-token"] = accessTokenData;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

mongoInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error?.response?.status === 403) {
      prevRequest.sent = true;

      const refreshToken = JSON.parse(sessionStorage.getItem("refreshToken")!) || "";

      const response = await axios.post(`http://localhost:4225/api/v1/user/refresh`, {
        refreshToken: refreshToken
      });

      sessionStorage.setItem("accessToken", JSON.stringify(response.data.data));

      prevRequest.headers["X-access-token"] = response.data.data;

      await mongoInstance(prevRequest);
      return;
    }
    return Promise.reject(error);
  }
);
