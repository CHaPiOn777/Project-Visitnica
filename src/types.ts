export type TResponse<T> = {
  success: boolean;
} & T;

export type TReaction = {
  _id: string,
  from: {
      _id: string,
      name: string,
      email: string
  },
  target: string | null,
  text?: string
}

export type TEmotion = TReaction & { emotion: string }

export type TComments = {
  total: number,
  items: Array<TReaction>
}