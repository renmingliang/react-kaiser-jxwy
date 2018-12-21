import React, { Component } from 'react'

const defaultRule = [
  {
    id: 1,
    txt:
      '<p>每位小主同一账号上传作品数限制<em class="rule-heightlight">3</em>个。</p>'
  },
  {
    id: 2,
    txt:
      '<p>每位小主同一账号每日可点赞5次，点赞次数会于次日00:00重置为5次；当日不可重复点赞同一作品。</p>'
  },
  {
    id: 3,
    txt:
      '<p>本活动严禁刷票行为，后台将进行实时监控，发现作品有刷票行为将取消其参赛及中奖资格。</p>'
  },
  {
    id: 4,
    txt:
      '<p class="rule-heightlight">活动奖品</p><p class="rule-heightlight">锦绣神级Call 1名（票数第1）：<br >2018最新款iPhone+唐嫣签名照片+游戏礼包;</p><p class="rule-heightlight">锦绣创意Call 2名（票数第2/3）：<br >iPad+唐嫣签名照片+游戏礼包;</p><p class="rule-heightlight">锦绣优秀Call 3名（票数第4/5/6）：<br >YSL口红+唐嫣签名照片+游戏礼包;</p><p class="rule-heightlight">锦绣人气Call 4名（票数第7-10）：<br >手游定制手账+游戏礼包</p>'
  },
  {
    id: 5,
    txt:
      '<p>活动时间：<em class="rule-heightlight">即日起至9月20日</em>，逾期提交的作品不参与评奖。</p>'
  },
  {
    id: 6,
    txt:
      '<p>领奖请关注“锦绣未央手游”官方微信，<em class="rule-heightlight">9月21日18:00</em>将公布中奖信息。</p>'
  },
  {
    id: 7,
    txt:
      '<p>参赛作品不得违反中国人民共和国相关法律，否则作品回收，取消参赛资格。</p>'
  },
  {
    id: 8,
    txt: '<p>活动最终解释权归锦绣未央手游所有。</p>'
  }
]

class DialogRule extends Component {
  constructor(props) {
    super(props)
    this.state = { rules: defaultRule }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.onHandleClose(false)
  }

  render() {
    return (
      <div className="dialog-rule">
        <div className="dialog-mask fixed"></div>
        <div className="rule-box bg">
          <span onClick={this.handleClose} className="rule-close bg"></span>
          <div className="rule-content">
            <h2 className="rule-title">活动规则</h2>
            <ul>
              {this.state.rules.map((val, index) => {
                return (
                  <li key={val.id} className="rule-item clearfix">
                    <span className="float-l">{index + 1}、</span>
                    <div dangerouslySetInnerHTML={{ __html: val.txt }}></div>
                  </li>
                )
              })}
            </ul>
            <div className="jxwy-qrcode">
              <img className="qrcode-img" src={require('../../../assets/images/02/qrcode-wx.jpg')} alt="jxwy-qrcode"/>
              <p className="qrcode-tips">领奖请关注“锦绣未央手游”官方微信，<br />查看中奖信息。</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DialogRule
