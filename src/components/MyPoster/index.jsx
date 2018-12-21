import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectUser } from '../../redux/actions';

import './index.less';

class MyPoster extends Component {
  constructor(props) {
    super(props)
    this.state = { limit: ['a', 'b', 'c'] }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(projectUser())
  }

  render() {
    const { limit } = this.state
    const myPoster = this.props.isMy
    return (
      <ul className="clearfix">
        {limit.map((val, ind) => {
          const temp = myPoster[ind]
          if (temp) {
            return (
              <li key={temp.feed_id} className="list-summary">
                <Link to={`/share/${temp.feed_id}`}>
                  <img src={temp.photo} alt={temp.feed_id} />
                </Link>
                <div className="handle-vote">
                  <span className={temp.vote > 0 ? 'filled' : 'empty'}>{temp.digg_count}</span>
                </div>
              </li>
            )
          } else {
            return (
              <li key={val} className="list-summary list-add">
                <Link to={'/home'}>
                  <div className="add-poster bg"></div>
                </Link>
              </li>
            )
          }
        })}
      </ul>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { isLoading, isMy } = state
  return { isLoading, isMy }
}

export default connect(mapStateToProps)(MyPoster)
