export default function checkResponse (resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    return resp.json().then((obj) => { throw new Error(obj.message) });
  }
}
