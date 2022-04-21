/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 14:24:01
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:41:27
 */
import Cookies from 'js-cookie'

const TokenKey: string = 'Ipad-Token'
const UserInfoKey: string = 'Ipad-Users'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfoKey) || '')
}

export function setUserInfo(obj: any) {
  return localStorage.setItem(UserInfoKey, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfoKey)
}
