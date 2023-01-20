function setCookie (cookieName, value, options={}) {
  options = {
    'path': '/',
    ...options
  }
  let createdCookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(value);
  for (let optionKey in options) {
    createdCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      createdCookie += "=" + optionValue;
    }
  }
  document.cookie = createdCookie;
}
function getCookie (cookieName) {
  let matches = document.cookie ? (document.cookie + '; ').split('; ')
  .filter((str) => str.includes(cookieName))[0]
  .split('=')[1] 
  : undefined ;
  return matches ? decodeURIComponent(matches) : undefined;
}

export {setCookie, getCookie}