import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { projectList, projectLike } from '../../../redux/actions'

class ListScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      lists: [],
      page_size: 1
    }
    this.handleMore = this.handleMore.bind(this)
  }

  handleMore() {
    if (this.state.isLoading) return false
    this.setState({isLoading: true},
      () => {
        this.fetchList()
      }
    )
  }

  handleVote(id, ind, e) {
    const { dispatch, items } = this.props
    const temp = items[ind]

    dispatch(projectLike({ feed_id: id })).then(() => {
      ++temp.digg_count
      temp.isVote = true
      console.log(items)
      this.setState({
        lists: items
      })
    })
  }

  fetchList() {
    const { dispatch, prevOffset, offset, page } = this.props
    const { page_size } = this.state
    const next = offset || prevOffset
    dispatch(projectList({ offset: next, page, page_size })).then(() => {
      // 获取更新后的数据
      const { items } = this.props
      this.setState({ lists: items, isLoading: false })
    })
  }

  componentDidMount() {
    const { prevOffset, items } = this.props
    // 第一次进入时
    if (!prevOffset) {
      this.fetchList()
    } else {
    // 已存在items数据时
      this.setState({
        lists: items
      })
    }
  }

  render() {
    const { offset } = this.props
    const { lists } = this.state
    return (
      <div>
        <ul className="clearfix">
          {lists.map((val, ind) => {
            return (
              <li key={val.feed_id} className="scroll-item">
                <Link to={`/share/${val.feed_id}`}>
                  <img src={val.photo} alt={val.feed_id} />
                </Link>
                <div
                  onClick={this.handleVote.bind(this, val.feed_id, ind)}
                  className="handle-vote"
                >
                  <span className={val.isVote? 'filled' : 'empty'}>
                    {val.digg_count}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="scroll-load text-center">
          {offset ? (
            <span onClick={this.handleMore} className="load-more">
              加载更多作品
            </span>
          ) : (
            <span className="load-empty">全部作品已加载完毕</span>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, fetchData } = state
  const { items, prevOffset, offset, page } = fetchData
  return { isLoading, items, prevOffset, offset, page }
}

export default connect(mapStateToProps)(ListScroll)