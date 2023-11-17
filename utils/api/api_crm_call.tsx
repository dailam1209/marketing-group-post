import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://210.245.108.202:3007/api/crm";
export const axiosCRMCall = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
axiosCRMCall.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
