import request from "../request";
import { TCommentsResponse } from "../types";

type TGetComments = {
  limit?: number;
  offset?: number;
  search?: string;
}

export const getCommentsRequest = ({offset = 0, limit = 12, search=''}: TGetComments): Promise<TCommentsResponse> => {
  const token = JSON.parse(localStorage.getItem('accessToken') || '{}').bearerToken;
  return request(`/comments?limit=${limit}&offset=${offset}&search=${search}`, {
    headers: {
      Authorisation: `${token}`
    }
  })
}