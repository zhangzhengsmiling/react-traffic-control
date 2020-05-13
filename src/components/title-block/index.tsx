import React from 'react';

import GlowingText from '../glowing-text';
import './style.scss';

const TitleBlock = (props) => {
  return <div style={{ position: 'relative', width: '100%', height: '10vh', textAlign: 'center', background: 'rgba(9, 21, 42, 1.0)', lineHeight: '10vh' }}>
    <div style={{ width: '40%', height: '2px', background: 'linear-gradient(to left, rgba(144, 240, 254, 0.6), rgba(144, 240, 254, 0))', position: 'absolute', top: '50%' }} />
    <div style={{ width: '40%', height: '2px', background: 'linear-gradienT(to right, rgba(144, 240, 254, 0.6), rgba(144, 240, 254, 0))', position: 'absolute', top: '50%', right: 0 }}></div>
    <GlowingText
      text="可视化交通管控"
      style={{
        fontSize: '32px',
        textShadow: '1px 1px 1px rgb(144, 240, 254)'
      }}
    />
  </div>
}

export default TitleBlock;
