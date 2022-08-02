import axios from "axios";
import isJwtTokenExpired from "jwt-check-expiry";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}`,
});

instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] = "Authorized by John";

instance.interceptors.request.use((config: any) => {
  let tokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";

  console.log(
    "isExpired is old:",
    isJwtTokenExpired(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRjMzQwMTcxM2Q5YzBmYTVkNTFjOTgiLCJpYXQiOjE2NTk0NDY1NzcsImV4cCI6MTY1OTQ0NjY5N30.mfdx98XToth30r2e4J5y6B-xfAIRWxaIsxdY1jSSDy0"
    )
  );

  console.log("isExpired is current:", isJwtTokenExpired(`${tokenData}`));

  let status = isJwtTokenExpired(`${tokenData}`);

  if (status) {
 
  }

  config.headers["X-access-token"] = `${tokenData}`;
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
