import request from "../request";
import { TCommentsResponse } from "../types";

type TGetComments = {
  limit?: number;
  offset?: number;
  search?: string;
}
type TDelComment = {
  id: number
}
const token = JSON.parse(localStorage.getItem('accessToken') || '{}').bearerToken;

export const getCommentsRequest = ({offset = 0, limit = 12, search=''}: TGetComments): Promise<TCommentsResponse> => {
  return request(`/comments?limit=${limit}&offset=${offset}&search=${search}`, {
    headers: {
      Authorisation: `${token}`
    }
  })
}

export const deletecommentRequest = (id: TDelComment) => {
  return fetch(`/comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorisation: `${token}`
    }
  })
  .then(res => {
    if(res.ok) {
      return res.text();
    } else {
      return res.text().then((obj) => { throw new Error('Ошибка удаления комментария') });
    }
  })
}