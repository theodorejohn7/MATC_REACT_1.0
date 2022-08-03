import axios from "axios";
import isJwtTokenExpired from "jwt-check-expiry";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}`,
});

instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] = "Authorized by John";

export let isRefTokenExpired: boolean;

instance.interceptors.request.use((config: any) => {
  let tokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";
  console.log("TOKENDATA", tokenData.length);
  // console.log("isExpired is current:", isJwtTokenExpired(`${tokenData}`));
  if (tokenData.length>0) {
    let status = isJwtTokenExpired(`${tokenData}`);

    if (status) {
      isRefTokenExpired = true;
    } else {
      isRefTokenExpired = false;
    }

    config.headers["X-access-token"] = `${tokenData}`;
  }
  return config;
});

export default instance;

export const mongoInstance = axios.create({
  baseURL: `${API_URL}`,
});
mongoInstance.defaults.headers.common["channelName"] = "Theodore's Channel";

mongoInstance.defaults.headers.common["Authorization"] =
  "Authorized by Theodore";

mongoInstance.interceptors.request.use((config: any) => {
  let tokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";
  config.headers["X-access-token"] = `${tokenData}`;
  return config;
});
