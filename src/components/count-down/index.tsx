import React, { Component, useReducer } from 'react';
import _ from 'lodash';

import filterProp from '../../utils/filterProp';

interface IPropCountDown {
  start?: number;
  value?: number;
  time?: number;
  ticks?: number;
  mapfn?: Function;
  style?: any;
  className?: string;
}


export default class CountDown extends Component<IPropCountDown, any> {

  timeoutId = null;

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      lock: false,  // 加锁，防止数字滚动过程中，刷新
      target: 0,
    }
  }
  
  componentDidMount() {
    const { start, value, time, ticks } = this.props;
    this.setState({ lock: true });
    if(!this.state.lock) this.roll(start, value, time, ticks);
  }

  componentWillReceiveProps({start, value, time, ticks}) {
    this.setState({ lock: true });
    if(!this.state.lock) this.roll(start, value, time, ticks);
  }

  roll = (start = 0, end = 10000, time = 1000, ticks = 200) => {
    // const start = start || 0,
    //       end = value || 10000,
    //       time = time || 3000,
    //       ticks = ticks || 200;
    this.setState({ target: end })
    let tick = 0;
    if(this.timeoutId) clearTimeout(this.timeoutId);
    const easeFactor = this.easeFactor('ease-sqrt', start, end, ticks);
    const fn = () => {
      tick++;
      this.setState({ counter: this.fnEaseSqrt(start, easeFactor, tick) });
      if(this.state.counter >= end) {
        this.setState({ counter: end });
        clearTimeout(this.timeoutId);
        this.setState({ lock: false })
        return;
      }
      if(Number.isNaN(this.state.counter)) {
        clearTimeout(this.timeoutId);
        this.setState({lock: false});
      }
      this.timeoutId = setTimeout(() => {
        fn();
      }, time / ticks)
    }
    fn();
  }

  // shouldComponentUpdate(props, state) {
  //   return props.value !== state.target || state.target !== state.counter;
  // }

  easeFactor = (mode, start, end, ticks) => {
    switch(mode) {
      case 'linear':
        return (end - start) / (ticks);
      case 'ease-sqrt':
        return (end - start) / Math.sqrt(ticks);
    }
  }

  // function: value = start + k * sqrt(tick);
  fnEaseSqrt = (start, easeFactor, tick) => {
    return start + easeFactor * Math.sqrt(tick);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  createEaseFucntion = () => {

  }

  render () {
    let mapfn = this.props.mapfn;
    return (
      <>
        {
          <span {...filterProp(this.props, 'mapfn')}>
            {
              (mapfn && _.isFunction(mapfn)) ? mapfn(this.state.counter) : this.state.counter
            }
          </span>
        }
      </>
    )
  }
}
