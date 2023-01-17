import checkResponse from "./check-response";

export default function request (url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}
