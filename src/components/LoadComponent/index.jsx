import React from 'react'
import LoadingMask from '../LoadingMask/index'

const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return LoadingMask()
  }
  else if (error) {
    return <div className="flex flex-center">网络异常，请稍后再试</div>
  }
  else {
    return null
  }
}

export default LoadingComponent