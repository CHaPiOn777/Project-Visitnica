import { getCookie } from "../cookie";
import request from "../request";
import { TProfileReactionsResponse } from "../types";

type TGetProfileReactions = {
  offset?: number;
  limit?: number;
  id: string;
}

export default function getProfileReactions ({offset = 0, limit = 12, id}: TGetProfileReactions): Promise<TProfileReactionsResponse> {
  return request(`/profiles/${id}/reactions?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}
