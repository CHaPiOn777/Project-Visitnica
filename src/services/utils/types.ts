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