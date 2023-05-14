import Cookies from 'js-cookie'

const TokenKey = 'user_token'
const timeKey = 'timestamp_key'

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
