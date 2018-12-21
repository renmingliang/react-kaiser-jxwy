import React, { Component } from 'react'
import PhotoClip from 'photoclip'

class crop extends Component {
  constructor(props) {
    super(props)
    this.pc = null
    this.handleFileCancel = this.handleFileCancel.bind(this)
  }

  handleFileCancel() {
    this.pc && this.pc.clear()
    this.props.onCropCancel()
  }

  componentDidMount() {
    const { uploadFile, onCropCrop } = this.props
    this.pc = new PhotoClip('#clipArea', {
      adaptive: ['100%', '100%'],
      outputSize: 640,
      img: uploadFile,
      ok: '#clipBtn',
      loadStart: function() {
        console.log('开始读取照片')
      },
      loadComplete: function() {
        console.log('照片读取完成')
      },
      done: function(dataURL) {
        onCropCrop(dataURL)
      },
      fail: function(msg) {
        alert(msg)
      }
    })
  }

  componentWillUnmount() {
    this.pc && this.pc.destroy()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { uploadFile } = nextProps
    if (this.props.uploadFile !== uploadFile) {
      this.pc && this.pc.load(uploadFile)
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
        <div id="clipArea" style={{ height: '6.40rem' }} />
        <div className="mask-head">
          <span
            onClick={this.handleFileCancel}
            className="mask-icon mask-cancel bg"
          />
          <span
            id="clipBtn"
            className="mask-icon mask-confirm bg"
          />
        </div>
      </div>
    )
  }
}

export default crop
