
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
// export default function checkResponse (resp) {
//   if (resp.ok) {
//     return resp.json();
//   } else {
//     return resp.json().then((obj) => { throw new Error(obj.message) });
//   }
// }
export const getUsers = ({offset = 0, limit = 12, cohort}) => {
  return fetch(`/profiles?limit=${limit}&offset=${offset}&cohort=${cohort}`, {
    headers: {
      Authorization: `Bearer ${getCookie('accessToken')}`
    }
  })
    .then(res => checkResponse(res))
    .then(res => console.log(res))
  // .then(res => checkReponse(res))
}





export default function checkResponse (resp) {
  if (resp.ok) {
    console.log(resp)
    return resp.json();
  } else {
    return resp.json().then((obj) => { throw new Error(obj.message) });
  }
}

function request (url, options) {
  return fetch(url, options).then(res => checkResponse(res));
}

function getCohortProfiles ({offset = 0, limit = 12, cohort}) {
  return request(`/profiles?limit=${limit}&offset=${offset}&cohort=${cohort}`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
  .then(res => console.log(res))
}
getCohortProfiles({offset: 0, limit: 12})
 

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

