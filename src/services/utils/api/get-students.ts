import request from "../request";
import { TStudentsResponse } from "../types";

type TGetStudents = {
  limit?: number;
  offset?: number;
  search?: string;
}
export const getStudentsRequest = ({offset = 0, limit = 12, search=''}: TGetStudents): Promise<TStudentsResponse> => {
  
  const token = JSON.parse(localStorage.getItem('accessToken') || '{}').bearerToken;
  return request(`/users?limit=${limit}&offset=${offset}&search=${search}`, {
    headers: {
      Authorisation: ` ${token}`
    }
  })
}