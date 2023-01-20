import { getCookie } from "../cookie"
import { TComments, TResponse } from "../../../types";

const config = {
    baseUrl: 'https://visitki.practicum-team.ru/api',
    headers: {
      'Content-Type': 'application/json'
    }
}

const checkResponse = <T>(res: Response) => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};

function request<T>(url: string, options?: RequestInit) {
  return fetch(url, options).then(res => checkResponse<T>(res))
}

export const getUserInfo = () => {
  const token = getCookie('accessToken');
  // return fetch('https://login.yandex.ru/info?format=json', {
    // headers: { 
    //   'Authorization': `OAuth ${getCookie('accessToken')}`,
    //   'method': 'GET',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  // })
  return fetch(`https://login.yandex.ru/info?format=jwt&oauth_token=${token}`)
}

export const getComment = () => {
  return request<TComments>('/profiles/abfccdaa23e0bd1c4448d2f3/reactions', {
    headers: config.headers
  })
}

export const postComment = (com: {target: string | null, text?: string, emotion?: string}, id: string) => {
  return request<TComments>('/profiles/e638ad9bce6d7efd1b5b035b/reactions', { //потом расхардкодим айди
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      emotion: com.emotion,
      target: com.target,
      text: com.text,
    })
  })
}

export const deleteComment = (id: string) => {
  return request<TComments>(`/comments/${id}`, { 
    method: 'DELETE',
    headers: config.headers
  })
}

