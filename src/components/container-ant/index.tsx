import React from 'react';

import './style.scss';

interface IPropContainerAnt {
  width?: string;
  children?: any;
  className?: string;
  style?: any;
}

const ContainerAnt = (props: IPropContainerAnt) => {
  const classname: string = props.className ? ('container-ant-box ' + props.className) : 'container-ant-box';
  return <div {...props} className={classname}>
    <div className="container-ant-content" style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', background: 'rgba(9, 21, 42, 1)' }}>
      { props.children }
    </div>
  </div>
}

export default ContainerAnt;
