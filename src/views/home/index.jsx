import React, { Component } from 'react';
import { connect } from 'react-redux';

import wxShare from '../../utils/js-sdk';
import { isWeiXin } from '../../utils';
import { getToken } from '../../utils/auth';

import JxwyMusic from '../../components/JxwyMusic/index';

import { checkSign, setBrowserMask } from '../../redux/actions';
import './index.less';

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleDaCall = this.handleDaCall.bind(this)
  }

  handleDaCall() {
    const { history, dispatch } = this.props

    if (isWeiXin()) {
      // 1.1已登录
      if (getToken()) {
        history.push('/upload')
      } else {
        // 1.2未登录
        dispatch(checkSign())
      }
    } else {
      dispatch(setBrowserMask(true))
    }
  }

  componentDidMount() {
    isWeiXin() && wxShare()
  }

  render() {
    return (
      <section className="home bg">
        <JxwyMusic />
        <div className="home-main">
          <div className="main-logo bg"></div>
          <div className="main-ty bg"></div>
          <div className="main-flower bg"></div>
          <div className="main-title-call bg"></div>
          <div className="main-title-center bg"></div>
        </div>
        <div className="home-intro">
          <h1 className="intro-title">活动介绍</h1>
          <div className="intro-txt">
            <p>
              锦绣未央手游C位出道！唐嫣倾情代言，邀你一起来为手游打call，为爱心动！现参与活动，赢取2018最新款
              <span>iPhone、iPad、YSL</span>限量版口红！
            </p>
          </div>
        </div>
        <div className="home-footer">
          <div onClick={this.handleDaCall} className="footer-btn bg"></div>
          <p className="footer-txt">活动最终解释权归锦绣未央手游所有</p>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, isLogin } = state
  const { token, user_info } = isLogin
  return { isLoading, token, user_info }
}

export default connect(mapStateToProps)(Home)
