import request from "../request";
import { getCookie } from "../cookie";

export default function getUserInfo (id) {
  return request(`/profiles/${id}`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}