import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListSwiper from './component/ListSwiper'
import ListScroll from './component/ListScroll'
import DialogRule from './component/DialogRule'
import DialogPoster from './component/DialogPoster'

import './index.less'

class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRule: false,
      showPoster: false,
      search: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleRule = this.handleRule.bind(this)
    this.handlePoster = this.handlePoster.bind(this)
  }

  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  handleSearch() {
    const { history } = this.props
    const { search } = this.state
    if ( search && Number(search)) {
      history.push({ pathname: `/share/${search}` })
    }
  }

  handleRule(status) {
    this.setState({
      showRule: status
    })
  }

  handlePoster(status) {
    this.setState({
      showPoster: status
    })
  }

  render() {
    const { showRule, showPoster, search } = this.state
    const { head_img_url, user_name } = this.props
    return (
      <section className="product bg">
        {showRule && <DialogRule onHandleClose={this.handleRule} />}
        {showPoster && <DialogPoster onHandleClose={this.handlePoster}/> }
        <div className="product-head">
          <div className="head-user">
            <Link to={'/'} className="user-join">
              参加活动
            </Link>
            <div className="user-info">
              {head_img_url && (
                <img
                  className="info-img"
                  src={head_img_url}
                  alt="avator"
                />
              )}
              <span className="info-name">{user_name}</span>
            </div>
          </div>
          <div className="head-kv bg" />
          <div className="head-handle">
            <span onClick={this.handlePoster} className="handle-txt">
              我的作品
            </span>
            <div className="handle-search">
              <input
                className="search-input"
                placeholder="按作品编号查询"
                name="search"
                value={search}
                onChange={this.handleInputChange}
                type="text"
              />
              <span onClick={this.handleSearch} className="search-btn bg" />
            </div>
            <span onClick={this.handleRule} className="handle-txt">
              活动规则
            </span>
          </div>
        </div>
        <div className="product-list">
          <div className="list-item">
            <h2 className="item-title">大咖打Call榜</h2>
            <div className="item-swiper">
              <ListSwiper />
            </div>
          </div>
          <div className="list-item">
            <h2 className="item-title">作品展示</h2>
            <div className="item-scroll">
              <ListScroll />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, isLogin, fetchData } = state
  const { user_name, head_img_url } = isLogin
  const { items } = fetchData
  return { isLoading, items ,user_name, head_img_url}
}

export default connect(mapStateToProps)(Product)
