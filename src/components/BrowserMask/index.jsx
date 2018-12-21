import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import ClipBoard from 'clipboard';

import './index.less';

class Browser extends Component {
  constructor(props) {
    super(props)
    this.handleBrowserClose = this.handleBrowserClose.bind(this)
    this.handleCopyLink = this.handleCopyLink.bind(this)
  }

  // 1.关闭弹框
  handleBrowserClose() {
    this.props.onHandleBrowserClose()
  }

  // 2.复制问卷链接
  handleCopyLink() {
    const clipboard = new ClipBoard('#copyBtn')
    clipboard.on('success', function(e) {
      Toast.info('复制成功')
    })

    clipboard.on('error', function(e) {
      Toast.info('复制失败，请手动保存二维码')
    })
  }

  componentDidMount() {
    this.handleCopyLink()
  }

  render() {
    const url = window.location.href.split('#')[0]
    return (
      <div className="browser">
        <div className="browser-box">
          <span onClick={this.handleBrowserClose} className="browser-close" />
          <ul>
            <li className="browser-item">
              <div className="browser-txt">
                1.复制链接至微信内打开，参与活动赢2018最新款iPhone！
              </div>
              <div className="browser-link">
                <div className="link-href">
                  <p>{url}</p>
                </div>
                <span
                  id="copyBtn"
                  data-clipboard-text={url}
                  className="link-copy"
                >
                  复制
                </span>
              </div>
            </li>
            <li className="browser-item">
              <div className="browser-txt">
                2.保存二维码，微信内“扫一扫”打开，参与活动赢2018最新款iPhone！
              </div>
              <div className="browser-qrcode text-center">
                <img
                  src={require('../../assets/images/02/qrcode.png')}
                  alt="borwser-qrcode"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Browser
