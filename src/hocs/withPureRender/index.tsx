import React, { Component } from "react";

const getDisplayName = (WrapperComponent) => {
  return WrapperComponent.displayName || WrapperComponent.name || 'Component';
}

const shallowEqual = (source: any, target: any) => {
  if(typeof(source) !== typeof(target)) return false;
  if(source === target) return true;
  const key_source = Object.keys(source);
  const key_target = Object.keys(target);
  if(key_source.length !== key_target.length) return false;
  return key_source.every(key => source[key] === target[key]);
}

const withPureRender = <P extends object>(ChildComponent: React.ComponentType<P>) => {
  const PureRender = class extends Component<P>{
    static displayName: string = `${getDisplayName(ChildComponent)}`;

    constructor(props) {
      super(props);
      // this.dis
    }

    shouldComponentUpdate(nextProps) {
      return !shallowEqual(nextProps, this.props);
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  } as P;
  return PureRender;
}

export default withPureRender;