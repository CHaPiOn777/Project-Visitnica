import { getCookie } from "../cookie"
import request from "../request";

export const postComment = (com: {target: string | null, text?: string, emotion?: string}, id: string) => {
  return fetch(`/profiles/${id}/reactions`, {
    method: 'POST',
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    },
    body: JSON.stringify({
      emotion: com.emotion,
      target: com.target,
      text: com.text,
    })
  }).then(res => res.ok ? res : 'Ошибка') //т.к. формат ответа не json, не используется json()
}

export const deleteComment = (id: string) => {
  return fetch(`/comments/${id}`, { 
    method: 'DELETE',
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  }).then(res => res.ok ? res : 'Ошибка')
}

