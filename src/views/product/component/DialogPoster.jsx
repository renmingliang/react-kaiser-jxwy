import React, { Component } from 'react'
import MyPoster from '../../../components/MyPoster/index'

class DialogPoster extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.onHandleClose(false)
  }

  render() {
    return (
      <div className="dialog-rule dialog-poster">
        <div className="dialog-mask fixed"></div>
        <div className="rule-box bg">
          <span onClick={this.handleClose} className="rule-close bg"></span>
          <div className="rule-content">
            <h2 className="rule-title">我的作品</h2>
            <MyPoster />
          </div>
        </div>
      </div>
    )
  }
}

export default DialogPoster
