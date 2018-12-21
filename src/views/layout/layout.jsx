import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { param2Obj } from '../../utils';

import route from '../../router';
import ScrollToTop from '../../components/ScrollToTop/index';
import BrowserMask from '../../components/BrowserMask/index';
import LoadingMask from '../../components/LoadingMask/index';

import LoadImg from '../../components/LoadImg/index';

import { setBrowserMask } from '../../redux/actions';

// 需要提前加载的素材图
const imgs = [
  require('../../assets/images/01/bg-1.png'),
  require('../../assets/images/01/ty.png'),
  require('../../assets/images/01/logo.png'),
  require('../../assets/images/01/center.png'),
  require('../../assets/images/01/call.png'),
  require('../../assets/images/01/flower.png')
]

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoadingMask: true }
    this.handleImgLoaded = this.handleImgLoaded.bind(this)
    this.handleBrowserClose = this.handleBrowserClose.bind(this)
  }

  // 关闭浏览器判断遮盖
  handleBrowserClose() {
    const { dispatch } = this.props
    dispatch(setBrowserMask(false))
  }

  // 关闭图片加载
  handleImgLoaded(isFinshed) {
    this.setState({ isLoadingMask: isFinshed })
  }

  componentDidMount() {
    // 依据URL参数有无feed_id来判断是否进入详情页
    const str = window.location.search.substr(1)
    const { feed_id, img_url } = param2Obj(str)
    if (feed_id) {
      let redirect = window.location.origin + `/#/share/${feed_id}`
      if (img_url) {
        redirect = window.location.origin + `/#/share/${feed_id}/?${img_url}`
      }
      window.location.href = redirect
    }
  }

  render() {
    const { isBrowserMask } = this.props
    const { isLoadingMask } = this.state

    return (
      <Route>
        {isLoadingMask ? (
          <div>
            <LoadingMask />
            <LoadImg imgs={imgs} onHandleImgLoaded={this.handleImgLoaded} />
          </div>
        ) : (
          <ScrollToTop>
            {isBrowserMask && (
              <BrowserMask onHandleBrowserClose={this.handleBrowserClose} />
            )}
            {route}
          </ScrollToTop>
        )}
      </Route>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isBrowserMask } = state
  return { isBrowserMask }
}

export default withRouter(connect(mapStateToProps)(Layout))
