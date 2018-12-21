import api from '../../service/api'
import { setToken } from '../../utils/auth'

// 类似vuex中的types常量
export const SET_LOADING = 'SET_LOADING'
export const SET_BROWSER_MASK = 'SET_BROWSER_MASK'
export const SET_LOGIN = 'SET_LOGIN'
export const SET_UPLOAD = 'SET_UPLOAD'
export const SET_CONTENT = 'SET_CONTENT'
export const SET_CREATE = 'SET_CREATE'
export const SET_LIST = 'SET_LIST'
export const SET_USER = 'SET_USER'
export const SET_DETAIL = 'SET_DETAIL'

// 同步操作
export function setLoading(params) {
  return {
    type: SET_LOADING,
    payload: params
  }
}

export function setBrowserMask(params) {
  return {
    type: SET_BROWSER_MASK,
    payload: params
  }
}

export function setLogin(params) {
  return {
    type: SET_LOGIN,
    payload: params
  }
}

export function setUpload(params) {
  return {
    type: SET_UPLOAD,
    payload: params
  }
}

export function setContent(params) {
  return {
    type: SET_CONTENT,
    payload: params
  }
}

export function setCreate(params) {
  return {
    type: SET_CREATE,
    payload: params
  }
}

export function setList(params) {
  return {
    type: SET_LIST,
    payload: params
  }
}

export function setUser(params) {
  return {
    type: SET_USER,
    payload: params
  }
}

export function setShow(params) {
  return {
    type: SET_DETAIL,
    payload: params
  }
}

// 异步操作
export function checkAuth(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.checkAuth(data)
        .then(res => {
          console.log(res)
          const { token, user_info } = res.data
          dispatch(setLoading(false))
          dispatch(setLogin(user_info))
          setToken(token)
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function checkSign(data) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      api.checkSign(data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}


export function checkUpload(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.checkUpload(data)
        .then(res => {
          const { img_url } = res.data
          dispatch(setLoading(false))
          dispatch(setUpload(img_url))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function checkContent(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.checkContent(data)
        .then(res => {
          dispatch(setLoading(false))
          dispatch(setContent(true))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function projectCreate(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.projectCreate(data)
        .then(res => {
          const { feed_id } = res.data
          console.log(res)
          dispatch(setLoading(false))
          dispatch(setCreate(feed_id))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function projectUpload(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.projectUpload(data)
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

export function projectList(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.projectList(data)
        .then(res => {
          console.log(res)
          dispatch(setList(res.data))
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

export function projectUser(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      api.projectUser(data)
        .then(res => {
          console.log(res)
          dispatch(setUser(res.data.list))
          resolve(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}

export function projectShow(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.projectShow(data)
        .then(res => {
          console.log(res)
          dispatch(setLoading(false))
          dispatch(setShow(res.data.feed_info))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function projectLike(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.projectLike(data)
        .then(res => {
          console.log(res)
          dispatch(setLoading(false))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}

export function projectRepost(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(setLoading(true))
      api.projectRepost(data)
        .then(res => {
          console.log(res)
          dispatch(setLoading(false))
          resolve(res)
        })
        .catch(err => {
          dispatch(setLoading(false))
          console.log(err)
        })
    })
  }
}