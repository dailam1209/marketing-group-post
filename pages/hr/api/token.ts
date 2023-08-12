export function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === cookieName) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}
export function getToken(your_cookie_name) {
  const cookieValue = getCookieValue(your_cookie_name);
  if (cookieValue) {
    const jsonObject = JSON.parse(cookieValue);
    const accessToken = jsonObject.access_token;
    return accessToken;
  } else {
  }
}

export function getCookieValue2(cookieName: string, cookieString: string) {
  const cookies = cookieString.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === cookieName) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}
const COOKIE_KEY = "user_365";
export function getToken2(cookieString: string) {
  const cookieValue = getCookieValue2(COOKIE_KEY, cookieString);
  if (cookieValue) {
    const jsonObject = JSON.parse(cookieValue);
    const accessToken = jsonObject.access_token;
    return accessToken;
  } else {
    return null;
  }
}