import jwt_decode from "jwt-decode";
import { getUserInfoRequest } from "./api/tokenApi";

export function refreshToken() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const isValid = accessToken.exp - new Date().getTime()
  if (!isValid) {
    getToken();
  }
}

export function getToken(user) {
  return getUserInfoRequest()
    .then(async (res) => {
      if (res.ok) {
        const token = await res.text();
        return token
      }
    })
    .then(res => {
      const decodedUser = jwt_decode(res);
      for (let key in decodedUser) {
        user[key] = decodedUser[key];
      }
      localStorage.setItem('accessToken', JSON.stringify({ 'bearerToken': decodedUser.jti, 'created_at': decodedUser.iat * 1000, 'exp': decodedUser.exp * 1000, 'name': decodedUser.name, avatar_id: decodedUser.avatar_id }))
    })
    .catch((err) => {
      console.error(`Ошибка загрузки данных пользователя: ${err}`);
    })
}