import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";

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

// const refresh = useRefreshToken();

const refresh = async () => {
  const refreshToken = JSON.parse(sessionStorage.getItem("refreshToken")!) || "";

  console.log("refresh token", refreshToken);
  const response = await axios.post(`http://localhost:4225/api/v1/user/refresh`, {
    refreshToken: refreshToken
  });
  console.log("@$# REFRESH", response.data);
  sessionStorage.setItem("accessToken", JSON.stringify(response.data.accessToken.data));
  return response.data.accessToken;
};

// useEffect(() => {
// const requestIntercept =

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

// const responseIntercept =

mongoInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refresh();
      prevRequest.headers["X-access-token"] = newAccessToken;
      return mongoInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
// return () => {
//   mongoInstance.interceptors.request.eject(requestIntercept);

//   mongoInstance.interceptors.response.eject(responseIntercept);
// };
// }, [refresh, accessTokenData]);

// mongoInstance.interceptors.request.use((config: any) => {
//   const accessTokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";
//   const refreshTokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";

//   if (accessTokenData.length > 0) {
//     config.headers["X-access-token"] = `${accessTokenData}`;
//   }

//   if (refreshTokenData.length > 0) {
//     config.headers["X-refresh-token"] = `${refreshTokenData}`;
//   }
//   return config;
// });

// mongoInstance.interceptors.response.use(undefined, (error: any) => {
// console.log("interceptor response", response);
// console.log("interceptor response error", error);

// if (error.response.data.message === "jwt expired") {
// const tokenData = JSON.parse(sessionStorage.getItem("refreshToken")!) || "";

//   mongoInstance.post( http://localhost:4225/api/v1/user/refresh)
// }
// });
