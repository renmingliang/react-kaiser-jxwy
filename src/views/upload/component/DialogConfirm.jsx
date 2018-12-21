import React, { Component } from 'react'

class DialogConfrim extends Component {

  handleConfirm(status, e) {
    this.props.onHandleConfirm(status)
  }

  render() {
    return (
      <div className="upload-confirm">
        <div className="dialog-mask fixed" />
        <div className="confirm-box bg">
          <div className="confirm-txt">
            <p>是否确实生成打Call海报？</p>
          </div>
          <div className="confirm-btn">
              <span onClick={this.handleConfirm.bind(this, true)} className="btn-item btn-ok bg" />
              <span onClick={this.handleConfirm.bind(this, false)} className="btn-item btn-cancel bg" />
          </div>
        </div>
      </div>
    )
  }
}

export default DialogConfrim
