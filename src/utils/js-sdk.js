import api from '../service/api';
import wx from 'weixin-js-sdk';

import { Toast } from 'antd-mobile';

const wxShare = function(json = {}, callback) {

  const url = window.location.href.split('#')[0]; //页面url#前的完整url
  const { feed_id, title, img_share, img_url } = json;

  Toast.info(JSON.stringify(json));

  const sharePhoto = img_url || '';
  const shareTitle = title || '锦绣打Call';
  const shareDesc = (feed_id && !sharePhoto) ? `是盆友就给我打Call→作品 ${feed_id}！我和唐嫣一起助力锦绣未央手游C位出道！` : '【锦绣未央手游C位出道】唐嫣邀你一起来打Call，赢最新款iPhone！'
  const shareImg = img_share || require('../assets/images/01/avator.png')

  api.checkSign({ referer_url: url })
    .then(res => {

      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function () {
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: url + '?feed_id=' + feed_id + '&img_url=' + sharePhoto, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            callback()
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        })
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: url + '?feed_id=' + feed_id + '&img_url=' + sharePhoto, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
            callback()
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        })
      });
    })
    .catch(err => {
      console.log("通信失败");
    })
}

export default wxShare;