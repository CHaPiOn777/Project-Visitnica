import checkResponse from "./check-response";

export default function request (url: string, options?: RequestInit) {
  // console.log('request', url); диагностика диагностивная
  return fetch(url, options).then(checkResponse);
}
