import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: `${API_URL}`,
});
instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] = "Authorized by John";


instance.interceptors.request.use((config: any) => {
  let tokenData = JSON.parse(sessionStorage.getItem("accessToken")!) || "";
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

