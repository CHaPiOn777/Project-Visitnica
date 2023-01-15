import { getCookie } from "../../services/utils/cookie"

const config = {
    baseUrl: 'https://visitki.practicum-team.ru/api',
    headers: {
      'Content-Type': 'application/json'
    }
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