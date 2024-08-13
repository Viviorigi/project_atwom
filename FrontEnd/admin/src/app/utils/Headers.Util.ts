import Cookies from "universal-cookie"

const cookie = new Cookies();
const getHeaders = () => {
  return {
      'Content-Type': 'application/json'
  }
}

const getAuth = () => {
  return {
    Authorization: `Bearer ${cookie.get("access_token")}` 
  };
}


export const HeadersUtil = {
  getHeaders: getHeaders,
  getAuth: getAuth
}