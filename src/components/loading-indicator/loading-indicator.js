import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import './loading-indicator.css'

const LoadingIndicator = () => {
  const loadingLine = <LoadingOutlined style={{ fontSize: 50 }} spin />
  return <Spin indicator={loadingLine} />
}

export default LoadingIndicator
