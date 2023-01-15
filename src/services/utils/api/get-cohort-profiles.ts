import { getCookie } from "../cookie";
import request from "../request";

export default function getCohortProfiles () {
  return request(`/profiles`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}