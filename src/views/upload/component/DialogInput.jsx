import React, { Component } from 'react'
import { Toast } from 'antd-mobile'

class DialogInput extends Component {
  constructor(props) {
    super(props)
    console.log(props.formInput)
    this.state = props.formInput || { name: '', love: '', ta: '', desc: '' }
    this.handleInput = this.handleInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInput() {
    const isValid = Object.values(this.state).filter(val => !val.length)
    if (isValid.length) {
      Toast.info('相关输入不能为空')
      return false
    } else {
      this.props.onHandleInput(this.state)
    }
  }

  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  render() {
    const { name, love, ta, desc } = this.state
    return (
      <div className="upload-form">
        <div className="dialog-mask fixed" />
        <div className="form-box bg">
          <div className="form-input">
            <label className="input-label">我是</label>
            <input
              className="input-item"
              maxLength="13"
              name="name"
              value={name}
              onChange={this.handleInputChange}
              placeholder="身份/职业 姓名/昵称，限13字"
              type="text"
            />
          </div>
          <div className="form-input">
            <label className="input-label">我爱</label>
            <input
              className="input-item"
              maxLength="13"
              name="love"
              value={love}
              onChange={this.handleInputChange}
              placeholder="人或事，限13字"
              type="text"
            />
          </div>
          <div className="form-input form-block">
            <label className="input-label">曾为TA</label>
            <input
              className="input-item"
              maxLength="11"
              name="ta"
              value={ta}
              onChange={this.handleInputChange}
              placeholder="为爱做出的事情，限11字"
              type="text"
            />
          </div>
          <div className="form-input form-block">
            <label className="input-label">我要在锦绣未央手游里</label>
            <input
              className="input-item item-desc"
              maxLength="15"
              type="text"
              name="desc"
              value={desc}
              onChange={this.handleInputChange}
              placeholder="希望在手游里达成的成就，限15字"
            />
          </div>
          <div className="form-txt">
            <p>我和唐嫣约定你，9月20日为爱心动！</p>
          </div>
          <div onClick={this.handleInput} className="form-btn bg" />
        </div>
      </div>
    )
  }
}

export default DialogInput
