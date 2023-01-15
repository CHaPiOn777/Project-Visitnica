import jwt_decode from "jwt-decode";
import { getUserInfoRequest } from "../../components/api/api";

export function refreshToken() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const isValid = accessToken.exp - new Date().getTime()
  if (!isValid) {
    getToken();
  }
  debugger
}

export function getToken(setName, user) {
  getUserInfoRequest()
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
      debugger
      localStorage.setItem('accessToken', JSON.stringify({ 'bearerToken': decodedUser.jti, 'created_at': decodedUser.iat * 1000, 'exp': decodedUser.exp * 1000 }))
      setName(decodedUser.name)
    })
}