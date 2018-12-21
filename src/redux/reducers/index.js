import { combineReducers } from 'redux'
import {
  SET_LOADING,
  SET_LOGIN,
  SET_UPLOAD,
  SET_CONTENT,
  SET_CREATE,
  SET_LIST,
  SET_USER,
  SET_DETAIL,
  SET_BROWSER_MASK
} from '../actions'

import { localData } from '../../utils'

const KEY_NAME = 'jx-name'
const KEY_IMG = 'jx-img'

const isLoading = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload
    default:
      return state
  }
}

const isBrowserMask = (state = false, action) => {
  switch (action.type) {
    case SET_BROWSER_MASK:
      return action.payload
    default:
      return state
  }
}

const isLogin = (state = { user_name: '', head_img_url: '' }, action) => {
  switch (action.type) {
    case SET_LOGIN:
      const { user_name, head_img_url } = action.payload
      const default_name = localData.get(KEY_NAME) || user_name
      const default_img = localData.get(KEY_IMG) || head_img_url
      localData.set(KEY_NAME, default_name)
      localData.set(KEY_IMG, default_img)
      return { ...state, user_name: default_name, head_img_url: default_img }
    default:
      return state
  }
}

const isUpload = (state = null, action) => {
  switch (action.type) {
    case SET_UPLOAD:
      return action.payload
    default:
      return state
  }
}

const isContent= (state = null, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return action.payload
    default:
      return state
  }
}

const isCreate = (state = null, action) => {
  switch (action.type) {
    case SET_CREATE:
      return action.payload
    default:
      return state
  }
}


const isDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_DETAIL:
      return action.payload
    default:
      return state
  }
}

const isMy = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
const fetchData = (state = { offset: '', prevOffset: '', page: 1, items: []}, action) => {
  switch (action.type) {
    case SET_LIST:
      let arr = []
      const { list, offset, page } = action.payload
      const prevOffset = state.offset || offset
      // 处理是否追加
      if (prevOffset && prevOffset !== offset) {
        arr = state.items.concat(list)
      } else {
        arr = list
      }
      return { ...state, items: arr, prevOffset, offset, page }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isLoading,
  isBrowserMask,
  isLogin,
  isUpload,
  isContent,
  isCreate,
  isDetail,
  isMy,
  fetchData
})

export default rootReducer
