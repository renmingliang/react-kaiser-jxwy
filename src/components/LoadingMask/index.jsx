import React from 'react';
import './index.less'
import loading from './loading.gif'

const LoadingMask = () => {
  return (
    <div className="fixed component-box">
      <div className="flex flex-center flex-ver">
        <div><img src={loading} alt="loading" /></div>
        <p className="txt">加载中</p>
      </div>
    </div>
  )
}



export default LoadingMask
