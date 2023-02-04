import { type } from "os";

export type TProfileResponse = {
  total: number;
  items: TProfile[];
}

export type TProfileReactionsResponse = {
  total: number;
  items: TReaction[];
}

export type TProfile = {
  _id: string;
  email: string;
  cohort: string;
  profile: {
    name: string;
    photo: string;
    city: {
      name: string;
      geocode: Array<string>
    }
  }
}

export type TReaction = {
  _id: string;
  from: {
    _id: string;
    name: string;
    email: string;
  },
  target: string | null;
  text?: string;
  emotion?: string;
}

export type TUser = {
  _id: string;
  role: string;
  cohort?: string;
}

export type TStudentsResponse = {
  total: number;
  items: TStudent[];
}

export type TStudent = {
  _id: string,
  createdAt: number,
  updatedAt: number | null,
  email: string | null,
  cohort: string,
  name: string | null
}

export type TCommentsResponse = {
  total: number;
  items: TAdminComment[];
}

export type TAdminComment = {
  _id: string,
  from: {
      _id: string,
      name: string,
      email: string
  },
  target: string | null,
  text: string,
  to: {
      _id: string,
      name: string,
      email: string
  }
}

export type TRawUser = {
  email: string,
  cohort: string
}