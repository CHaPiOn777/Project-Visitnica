import { getCookie } from "../cookie"
import request from "../request";

export const getComment = (userId: string) => {
  return request(`/profiles/${userId}/reactions`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}

export const postComment = (com: {target: string | null, text?: string, emotion?: string}, id: string) => {
  return request('/profiles/e638ad9bce6d7efd1b5b035b/reactions', { //потом расхардкодим айди
    method: 'POST',
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    },
    body: JSON.stringify({
      emotion: com.emotion,
      target: com.target,
      text: com.text,
    })
  })
}

export const deleteComment = (id: string) => {
  return request(`/comments/${id}`, { 
    method: 'DELETE',
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}

