import Axios from 'axios'
import request from '@/utils/request'

// Cache processor
export var Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) {
      console.log('failed session setting')
      return false
    }
    window.sessionStorage.setItem(key, JSON.stringify(data))
    console.log('session success')
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

export function validatePasswd(username, password) {
  var sentData = JSON.stringify({
    'username': username,
    'passwd': password
  })
  return Axios.post('http://134.175.58.86:9999/login', sentData)
    .then(res => {
      return res.data
    })
}

export function validateRegister(username, password) {
  var sentData = JSON.stringify({
    'username': username,
    'passwd': password
  })
  return Axios.post('http://134.175.58.86:9999/signup', sentData)
    .then(res => {
      return res.data
    })
}

export function getLoginedUserName() {
  return window.sessionStorage.getItem('username')
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function sign(username, password) {
  var sentData = JSON.stringify({
    'username': username,
    'passwd': password
  })
  return Axios.post('http://134.175.58.86:9999/signup', sentData)
    .then(res => {
      return res.data
    })
}
