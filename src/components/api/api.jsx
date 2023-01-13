import { getCookie } from "../../services/utils/cookie"

const config = {
    baseUrl: 'https://visitki.practicum-team.ru/api',
    headers: {
      'Content-Type': 'application/json'
    }
}

const configOAUTH = {
  baseUrl: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=a658c83148cf495f9b4b864843601cf1'
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
  return fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`)
}