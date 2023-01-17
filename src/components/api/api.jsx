
import { getCookie } from "../../services/utils/cookie"


const config = {
  baseUrl: 'https://visitki.practicum-team.ru/api',
  headers: {
    'Content-Type': 'application/json'
  }

}

// /profiles/:id
const baseUrl = 'https://visitki.practicum-team.ru/api'
// const checkReponse = (res) => {
//   return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
// }

export const getUsers = () => {
  return fetch('https://visitki.practicum-team.ru/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  // .then(res => checkReponse(res))
}


getUsers()
  .then(res => console.log(res))
 

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

