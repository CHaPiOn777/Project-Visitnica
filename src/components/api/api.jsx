const config = {
    baseUrl: 'https://visitki.practicum-team.ru/api',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // /profiles/:id
const baseUrl = 'https://visitki.practicum-team.ru/api'
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getUsers = () => {
  return fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => console.log(res))
  .then(res => checkReponse(res))
}

