import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile'
import { checkAuth } from '../../redux/actions'
import { param2Obj } from '../../utils'

// 微信回调地址
class Login extends Component {

  componentDidMount() {
    // 依据URL参数有无code
    const { dispatch, history, location } = this.props
    const str = window.location.search.substr(1)
    const { code } = param2Obj(str)
    if (!code) {
      Modal.alert('温馨提示', '您已拒绝授权登陆')
        .onClose(() => {
          console.log('close')
          history.back()
        })
    }
    const { from } = location.state || { from: { pathname: '/' } }
    dispatch(checkAuth({ auth_code: code }))
      .then(res => {
        history.push(from)
      })
  }

  render() {
    return null
  }
}

export default connect()(Login)
