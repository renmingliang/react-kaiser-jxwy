import request from './request'

export default {
  // 1.1微信授权登陆
  checkAuth: data => {
    return request.post('/vote/oauth/authorize', data)
  },
  // 1.2微信授权分享
  checkSign: data => {
    return request.post('/vote/common/get-sign', data)
  },
  // 2.检查上传文件合法性
  checkUpload: data => {
    return request.post('/vote/feed/upload-photo', data)
  },
  // 3.检查文字输入合法性
  checkContent: data => {
    return request.post('/vote/feed/check-words', data)
  },
  // 4.作品创建
  projectCreate: data => {
    return request.post('/vote/feed/create', data)
  },
  // 5.作品上传
  projectUpload: data => {
    return request.post('/vote/feed/upload', data)
  },
  // 6.作品详情
  projectShow: data => {
    return request.get('/vote/feed/show', { params: data })
  },
  // 7.作品点赞
  projectLike: data => {
    return request.post('/vote/feed/like', data)
  },
  // 8.作品转发
  projectRepost: data => {
    return request.post('/vote/feed/repost', data)
  },
  // 9.作品列表 -- 我的
  projectUser: () => {
    return request.get('/vote/user/feed-timeline')
  },
  // 10.作品列表 -- 所有
  projectList: data => {
    return request.post('/vote/feed/rank-list', data)
  }
}
