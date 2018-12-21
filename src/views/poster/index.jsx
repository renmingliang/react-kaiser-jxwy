import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { projectShow, projectRepost } from '../../redux/actions';

import wxShare from '../../utils/js-sdk';
import MyPoster from '../../components/MyPoster/index';

import './index.less';

class Poster extends Component {
  constructor(props) {
    super(props)
    this.handelShare = this.handelShare.bind(this)
  }

  handelShare() {
    Toast.info('点击右上角分享', 1)
  }

  fetchDetail() {
    const { match, dispatch } = this.props
    const { id } = match.params
    dispatch(projectShow({ feed_id: id }))
  }

  fetchShare() {
    const { match, dispatch } = this.props
    const { id } = match.params
    dispatch(projectRepost({ feed_id: id }))
  }

  fetchWxShare() {
    const { match } = this.props
    const { id } = match.params
    wxShare({ feed_id: id }, this.fetchShare)
  }

  componentDidMount() {
    this.fetchDetail()
    this.fetchWxShare()
  }

  render() {
    const { photo, feed_id, repost_count } = this.props.isDetail
    return (
      <section className="poster bg">
        <div className="poster-main">
          <div className="main-mask">
            <img src={photo} alt="poster" />
          </div>
        </div>
        <div className="poster-handle">
          <div className="handle-txt">
            <span>*长按保存图片</span>
            <span>
              作品编号：
              {feed_id}
            </span>
          </div>
          <div onClick={this.handelShare} className="handle-btn bg" />
          <div className="handle-txt text-right">
            <span>已有 {repost_count} 次分享</span>
          </div>
        </div>
        <div className="poster-footer">
          <h3 className="footer-title">小主作品集</h3>
          <div className="footer-box">
            <Link className="footer-link" to={'/product'}>
              >>点击查看更多作品
            </Link>
            <div className="poster-list">
              <MyPoster />
              <p className="poster-limit">*小主能上传3张照片哦</p>
            </div>
            <div className="jxwy-qrcode">
              <img
                className="qrcode-img"
                src={require('../../assets/images/02/qrcode-wx.jpg')}
                alt="jxwy-qrcode"
              />
              <p className="qrcode-tips">
                领奖请关注“锦绣未央手游”官方微信，
                <br />
                查看中奖信息。
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, isDetail } = state
  return { isLoading, isDetail }
}

export default connect(mapStateToProps)(Poster)
