import { TEmotion } from "../../types";

export const setQty = (arr: Array<TEmotion>) => {
  return arr.reduce((acc: { [emotion: string]: number}, el) => {
      const emotion = el.emotion;
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
  }, {})
}