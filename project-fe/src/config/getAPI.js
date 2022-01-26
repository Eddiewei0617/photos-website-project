import axios from "axios";
import { API_URL } from "../config/blockColor";

export async function getUserInfo(setUserInfo) {
  try {
    let user = await axios.get(`${API_URL}/auth/userinfo`, {
      withCredentials: true,
    });
    setUserInfo(user.data);
  } catch (e) {
    console.error(e);
  }
}
