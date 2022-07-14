import axios from "axios";

const instance = axios.create({
  baseURL: `https://react-theo-default-rtdb.firebaseio.com/`,
});
instance.defaults.headers.common["channelName"] = "John's Channel";

instance.defaults.headers.common["Authorization"] =
 "Authorized by John";


export const mongoInstance = axios.create({
  baseURL: `https://localhost:7002/`,
});
mongoInstance.defaults.headers.common["channelName"] = "Theodore's Channel";

mongoInstance.defaults.headers.common["Authorization"] =
 "Authorized by Theodore";

export default instance;