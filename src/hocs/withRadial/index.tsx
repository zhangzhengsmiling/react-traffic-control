import React from 'react';

import './style.scss';

const withRadial = <P extends Object>(ChildComponent: React.ComponentType<P>) => {
  return class extends React.Component<P> {

    constructor(props) {
      super(props);
    }

    render() {
      return <div style={{ width: 'auto', height: 'auto', background: 'transparent', display: 'inline-block', position: 'absolute' }} className="radial">
        <div style={{ width: '20px', height: '20px', background: 'red', borderRadius: '50%' }}></div>
      </div>
    }
  };
}

export default withRadial;
