import { getCookie } from "../cookie";
import { TProfileResponse } from "../types";
import request from "../request";

type TGetProfiles = {
  limit?: number;
  offset?: number;
  cohort?: string;
}

export default function getCohortProfiles ({offset = 0, limit = 12, cohort}: TGetProfiles): Promise<TProfileResponse> {
  return request(`/profiles?limit=${limit}&offset=${offset}&cohort=${cohort}`, {
    headers: {
      Authorisation: `Bearer ${getCookie('accessToken')}`
    }
  })
}