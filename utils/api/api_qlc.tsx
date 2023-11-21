import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://localhost:3002/api/qlc";
export const axiosQLC = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosQLC.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
