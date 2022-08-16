import axios from "axios";
// import { useSessionStorage } from "../hooks/useSessionStorage";

const API_URL = process.env.REACT_APP_API_URL;

const useRefreshToken = () => {
  // const [accessToken, setAccessToken] = useSessionStorage<string[]>("accessToken", []);

  const refresh = async () => {
    // const refreshToken = sessionStorage.getItem("refreshToken");
    const refreshToken = JSON.parse(sessionStorage.getItem("refreshToken")!) || "";

    console.log("refresh token", refreshToken);
    const response = await axios.post(`${API_URL}/refresh`, { refreshToken: refreshToken });

    // console.log("access token", accessToken);
    // setAccessToken(response.data.accessToken);
    sessionStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
