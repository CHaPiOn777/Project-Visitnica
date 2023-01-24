import request from "../request";
import { TStudentsResponse, TRawUser } from "../types";

type TGetStudents = {
  limit?: number;
  offset?: number;
  search?: string;
}
type TPutStudent = {
  id: string;
  cohort: string;
  email: string;
  name: string;
}

const token = JSON.parse(localStorage.getItem('accessToken') || '{}').bearerToken;

export const getStudentsRequest = ({offset = 0, limit = 12, search=''}: TGetStudents): Promise<TStudentsResponse> => {
  return request(`/users?limit=${limit}&offset=${offset}&search=${search}`, {
    headers: {
      Authorisation: `${token}`
    }
  })
}

export const putStudentInfoRequest = ({id, cohort, email, name}: TPutStudent) => {
  return request(`/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorisation: `${token}`
    },
    body: JSON.stringify({
      cohort, 
      email, 
      name
    })
  })
}

export function postStudentRequest(user: TRawUser) {
  return request('/users', {
    method: 'POST',
    headers: {
      Authorisation: `${token}`
    },
    body: JSON.stringify({
      user: user
    })
  })
}