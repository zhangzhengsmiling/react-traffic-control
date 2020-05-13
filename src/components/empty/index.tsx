import React from 'react';

const Empty = () => {
  return <div style={{ position: 'relative' ,width: '100%', height: '200px', background: 'rgba(22, 55, 101, 0.4)' }}>
    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }} >暂无数据</span>
  </div>
}

export default Empty;
