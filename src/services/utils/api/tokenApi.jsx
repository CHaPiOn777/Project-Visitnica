import { getCookie } from "../cookie";


const config = {
    baseUrl: 'https://visitki.practicum-team.ru/api',
    headers: {
      'Content-Type': 'application/json'
    }
}

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

export const getStudentsRequest = () => {
  const token = JSON.parse(localStorage.getItem('accessToken')).bearerToken;
  return fetch(`/users?limit=2&offset=2&serch?`, {
    headers: {
      Authorisation: ` ${token}`
    }
  })
  .then(res => res.json())
}

export const getCommentsRequest = () => {
  const token = JSON.parse(localStorage.getItem('accessToken')).bearerToken;
  return fetch(`/comments?limit=2&offset=2&serch?`, {
    headers: {
      Authorisation: ` ${token}`
    }
  })
  .then(res => res.json())
}