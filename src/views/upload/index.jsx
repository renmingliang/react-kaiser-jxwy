import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'

import DialogInput from './component/DialogInput'
import DialogConfirm from './component/DialogConfirm'
import RenderSlogan from './component/RenderSlogan'
import Photo from './component/Photo'

import { checkUpload, checkContent, projectCreate, projectUpload } from '../../redux/actions'

import screenshot from '../../utils/screenshot'

import './index.less';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInput: false,
      showConfirm: false,
      showLoading: false,
      formInput: null,
      uploadFile: null,
      content: '',
      cropUrl: '',
      img_url: ''
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.handelCompose = this.handelCompose.bind(this)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleCrop = this.handleCrop.bind(this)

    this.handleBack = this.handleBack.bind(this)
    this.handleCheck = this.handleCheck.bind(this)

    this.handleInput = this.handleInput.bind(this)
    this.handleInputEdit = this.handleInputEdit.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  // 1.校验文字输入合法性
  handleInput(json) {
    const { dispatch } = this.props
    this.setState({ formInput: json })
    const content = Object.values(json).join('#')
    dispatch(checkContent({content}))
      .then(() => {
        this.setState({ showInput: false, content })
      })
  }

  // 2.显示输入框 - 重新编辑
  handleInputEdit() {
    this.setState({ showInput: true })
  }

  // 3.取消文件上传
  handleCancel() {
    this.setState({ uploadFile: null, cropUrl: '' })
  }

  // 4.校验文件上传合法性
  handleCrop(cropUrl) {
    const { dispatch } = this.props
    this.setState({ cropUrl: cropUrl })
    dispatch(checkUpload({ img_data: cropUrl }))
      .then(res => {
        const { img_url } = res.data
        this.setState({ img_url, showInput: true })
      })
  }

  handleBack() {
    console.log('back')
  }

  handleCheck() {
    console.log('check')
  }

  // 5.校验上传文件大小及类型
  handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return false

    // 检验用户是否选则是图片文件
    if (file.type.split('/')[0] !== 'image') {
      Toast.info('上传文件类型必须为图片')
      return false
    }

    // 限定上传最大尺寸5M
    if (file.size / 1024 / 1024 > 5) {
      Toast.info('图片尺寸最大不得超过5M')
      return false
    }

    this.setState({
      uploadFile: file,
      cropUrl: ''
    })
  }

  // 6.弹出生成海报对话框
  handelCompose() {
    const { formInput, cropUrl } = this.state
    if (!formInput || !cropUrl) return false
    this.setState({ showConfirm: true })
  }

  // 7.生成海报对话框操作
  handleConfirm(status) {
    const { content, img_url } = this.state
    const { history, dispatch } = this.props
    this.setState({ showConfirm: false })

    // 7.1确认生成
    if (status) {
      this.setState({ showLoading: true }, () => {
        dispatch(projectCreate({content, img_url}))
          .then(res => {
            const { feed_id } = res.data
            screenshot(this.refs.poster)
              .then(poster => {
                dispatch(checkUpload({ img_data: poster }))
                  .then(res => {
                    const { img_url } = res.data
                    dispatch(projectUpload({ feed_id, img_url }))
                      .then(() => {
                        this.setState({
                          showLoading: false
                        }, () => {
                          history.push({ pathname: `/poster/${feed_id}` })
                        })
                      })
                  })
              })
          })
      })
    }
  }

  render() {
    const {
      uploadFile,
      cropUrl,
      showInput,
      formInput,
      showConfirm,
      showLoading
    } = this.state
    const { posterId } = this.props
    const href = window.location.origin
    return (
      <section className="upload bg">
        {showInput && <DialogInput formInput={formInput} onHandleInput={this.handleInput} />}
        {showConfirm && <DialogConfirm onHandleConfirm={this.handleConfirm} />}
        {showLoading && (
          <div>
            <div className="dialog-mask fixed" />
            <div className="box-loading bg" />
            {/* <div className="mask-head">
              <span
                onClick={this.handleBack}
                className="mask-icon mask-back bg"
              />
              <span
                onClick={this.handleCheck}
                className="mask-txt"
              >上传</span>
            </div> */}
          </div>
        )}
        <div className="upload-main">
          <div ref="poster" className="main-mask bg">
            {posterId && (
              <div className="mask-qrcode">
                <QRCode style={{ width: '.96rem', height: '.96rem', display: 'block' }} value={`${href}/${posterId}`} />
              </div>
            )}
            <div className="mask-floor">
              <img src={require('../../assets/images/02/mask-floor.png')} alt="floor"/>
            </div>
            <div className="mask-box">
              {uploadFile && (
                <div className="mask-img">
                  {cropUrl ? (
                    <div>
                      <img src={cropUrl} alt="crop" />
                      {formInput && (
                        <RenderSlogan
                          onHandleInputEdit={this.handleInputEdit}
                          formInput={formInput}
                        />
                      )}
                    </div>
                  ) : (
                    <Photo
                      uploadFile={this.state.uploadFile}
                      onCropCrop={this.handleCrop}
                      onCropCancel={this.handleCancel}
                    />
                  )}
                </div>
              )}
              <div>
                <label className="box-upload">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={this.handleUpload}
                    // accept="image/jpeg,image/jpg,image/png"
                    accept="image/*"
                  />
                  拍照
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="upload-flow">
          <h2 className="flow-title">操作流程</h2>
          {uploadFile && (
            <label htmlFor="file" className="flow-again">
              重新上传
            </label>
          )}
          <div className="flow-intro bg" />
        </div>
        <div className="upload-footer">
          <div onClick={this.handelCompose} className="footer-btn bg" />
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { posterId } = state
  return { posterId }
}

export default connect(mapStateToProps)(Upload)
