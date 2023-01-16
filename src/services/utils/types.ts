export type TProfileResponse = {
  total: number;
  items: TProfile[];
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