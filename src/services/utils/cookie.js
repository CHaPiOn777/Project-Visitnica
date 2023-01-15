function setCookie (cookieName, value) {
  document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(value) + '; path=/';
}
function getCookie (cookieName) {
  let matches = document.cookie ? (document.cookie + '; ').split('; ')
  .filter((str) => str.includes(cookieName))[0]
  .split('=')[1] 
  : undefined ;
  return matches ? decodeURIComponent(matches) : undefined;
}

export {setCookie, getCookie}