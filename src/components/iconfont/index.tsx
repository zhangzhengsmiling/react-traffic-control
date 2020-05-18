import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1818189_e700d6jlena.js',
})

const Iconfont = (props: any) => {
  const classname = props.className ? `icon-text` : `${props.className} icon-text`
  return <Icon {...props} className={classname} />
}

export default Iconfont;
