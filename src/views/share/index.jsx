import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { projectShow, projectLike, projectRepost } from '../../redux/actions';


import wxShare from '../../utils/js-sdk';

import './index.less';

class Share extends Component {
  constructor(props) {
    super(props)
    this.state = { isVote: false, img_url: '', detail: {} }
    this.handelVote = this.handelVote.bind(this)
    this.handelShare = this.handelShare.bind(this)
  }

  handelVote() {
    if (this.state.isVote)  return false
    const { dispatch, match } = this.props
    const { id } = match.params
    dispatch(projectLike({ feed_id: id }))
      .then(() => {
        this.fetchDetail()
        this.setState({ isVote: true })
      })
  }

  handelShare() {
    Toast.info('点击右上角分享', 1)
  }

  fetchDetail() {
    const { match, dispatch } = this.props
    const { id } = match.params
    dispatch(projectShow({ feed_id: id }))
      .then(res => {
        const { feed_info } = res.data
        this.setState({ detail: feed_info })
      })
  }

  fetchShare() {
    const { match, dispatch } = this.props
    const { id } = match.params
    dispatch(projectRepost({ feed_id: id }))
  }

  fetchWxShare() {
    const { match, location } = this.props
    const { id } = match.params
    const { search } = location
    const share_info = {feed_id: id, img_url: search.substr(1)}
    wxShare(share_info, this.fetchShare)
  }

  componentDidMount() {
    const { search } = this.props.location
    if (search) {
      const img_url = search.substr(1)
      this.setState({ img_url })
    } else {
      this.fetchDetail()
    }

    this.fetchWxShare()
  }

  render() {
    // const { photo, feed_id, user_name, digg_count } = this.props.isDetail
    const { isVote, img_url, detail } = this.state
    const { photo, feed_id, user_name, digg_count } = detail
    const img_src = img_url || photo

    const dom = (
      <section className="share bg">
        <div className="share-info">
          <Link className="info-link" to={'/product'}>查看更多</Link>
          {
            !img_url && (
              <div className="info-user">
                <p>编号：{feed_id}</p>
                <p>作者：{user_name}</p>
              </div>)
          }
        </div>
        <div className="share-main">
          <div className="main-mask">
            <img src={img_src} alt="share" />
          </div>
        </div>
        <div className="share-handle">
          {
            !img_url && (
              <div className="handle-box">
                <div onClick={this.handelShare} className="handle-btn bg">
                  <span className="btn-txt">分享给好友</span>
                </div>
                <div onClick={this.handelVote} className="handle-btn bg">
                  <span className={isVote ? "btn-txt btn-zan filled" : "btn-txt btn-zan empty"}>{digg_count}</span>
                </div>
              </div>
            )
          }
        </div>
        <div className="share-my bg">
          <Link to={{ pathname: '/' }} />
        </div>
      </section>
    )

    const noMatch = (
      <section className="share bg">
        <div className="share-info">
          <Link className="info-link" to={'/product'}>返回查看</Link>
        </div>
      </section>
    )
    return (img_src? dom : noMatch)
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, isDetail } = state
  return { isLoading, isDetail }
}

export default connect(mapStateToProps)(Share)
