import axios from "axios";
 
const API_URL = process.env.REACT_APP_API_URL;


export const mongoInstance = axios.create({
  baseURL: API_URL,
});
mongoInstance.defaults.headers.common["channelName"] = "Theodore's Channel";

mongoInstance.defaults.headers.common["Authorization"] =
 "Authorized by Theodore";
 