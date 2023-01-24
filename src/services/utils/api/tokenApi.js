import { getCookie } from "../cookie";

export const getUserInfoRequest = () => {
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


