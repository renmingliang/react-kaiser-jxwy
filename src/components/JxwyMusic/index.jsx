import React, { Component } from 'react';

import wx from 'weixin-js-sdk';

import './index.less';

class Music extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlay: true
    }
    this.handleToggleMusic = this.handleToggleMusic.bind(this)
  }

  handleToggleMusic() {
    // 由于animation-play-state在移动端不兼容，故这样处理实现
    // 1.先获取tranform样式
    const btnTransform = getComputedStyle(this.refs.musicBtn).transform
    const boxTransform = getComputedStyle(this.refs.musicBox).transform

    // 2.切换播放状态
    this.setState((prevState, props) => ({
      isPlay: !prevState.isPlay
    }), () => {
      if (this.state.isPlay) {
        // 2.1 播放
        this.refs.music.play()
      } else {
        // 2.2 暂停，并将子级运动状态保存至父级transform样式
        this.refs.musicBox.style.transform = boxTransform === 'none' ? btnTransform : btnTransform.concat(' ', boxTransform)
        this.refs.music.pause()
      }
    })
  }

  componentDidMount () {
    const self = this
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') < 0) {
      // 非微信浏览器内，不支持自动播放，关闭显示状态
      this.setState({
        isPlay: false
      })
    } else {
      // 如在微信浏览器内，调用自动播放
      wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
      });
      wx.ready(function () {
        self.refs.music.play()
      });
    }
  }

  render() {
    const { isPlay } = this.state
    return (
      <div className="Jxwy-music" ref="musicBox">
        <div
          ref="musicBtn"
          className={isPlay ? "music-btn animate" : "music-btn"}
          onClick={this.handleToggleMusic} />
        <audio loop="loop" preload="auto" ref="music">
          <source
            src={require('../../assets/media/jxwy-h5.wav')}
            type="audio/wav"
          />
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    )
  }
}

export default Music
