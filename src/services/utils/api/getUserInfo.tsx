import request from "../request";
import { getCookie } from "../cookie";
import { TCommentsResponse, TUserInfo } from "../types";

export default function getUserInfo (id: string): Promise<TUserInfo> {
  return request(`/profiles/${id}`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}