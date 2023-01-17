// Пока в бэке нет эндпойнта, который выдавал бы пользователю собственный профиль.
// Так же нет и способа определить, студентом является пользователь, или куратором.
// Исходя из этого пока хардкожу эти данные сюда.

import { TUser } from "../types";

export default function getUserProfile (): Promise<TUser> {
  return new Promise((resolve) => {
    resolve(
      {
        _id: 'abfccdaa23e0bd1c4448d2f3',
        role: 'curator',
        cohort: 'web+16'
      }
    );
  });
}