import React, { Component } from 'react'

class RenderSlogan extends Component {
  handleInputEdit(formInput, e) {
    this.props.onHandleInputEdit(formInput)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { formInput } = nextProps
    if (this.props.formInput !== formInput) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { formInput } = this.props
    return (
      <div onClick={this.handleInputEdit.bind(this, formInput)} className="mask-slogan">
        <div className="slogan-name">
          <img src={require('../../../assets/images/04/1.png')} alt="name"/>
          <span>{formInput.name}</span>
        </div>
        <div className="slogan-love">
          <img src={require('../../../assets/images/04/2.png')} alt="love"/>
          <span>{formInput.love}</span>
        </div>
        <div className="slogan-ta">
          <img src={require('../../../assets/images/04/3.png')} alt="ta"/>
          <span>{formInput.ta}</span>
        </div>
        <div className="slogan-jx">
          <img src={require('../../../assets/images/04/4.png')} alt="jx"/>
        </div>
        <div className="slogan-desc">
          <span>{formInput.desc}</span>
        </div>
        <div className="slogan-ty">
          <img src={require('../../../assets/images/04/5.png')} alt="ty" />
        </div>
      </div>
    )
  }
}

export default RenderSlogan
