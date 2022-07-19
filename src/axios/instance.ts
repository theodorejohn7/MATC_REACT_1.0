import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


const instance = axios.create({
  baseURL: `${API_URL}`,
});
instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] =
 "Authorized by John";


export const mongoInstance = axios.create({
  baseURL: `${API_URL}`,
});
mongoInstance.defaults.headers.common["channelName"] = "Theodore's Channel";

mongoInstance.defaults.headers.common["Authorization"] =
 "Authorized by Theodore";

export default instance;