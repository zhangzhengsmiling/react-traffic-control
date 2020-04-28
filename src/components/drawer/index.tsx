import React, { useEffect, useState } from 'react';

const Drawer = (props) => {
  // const initPosition = useMemo((flag) => flag ? 0 : 100, []);
  // const initPosition: any = useMemo((flag: boolean) => flag ? 0 : 100, []);
  const DEFAULT_SIZE = {
    width: '200px',
    height: '600px',
  }
  const initPosition = (flag: boolean) => flag === true ? 0 : 0;
  const [position, setPosition] = useState(initPosition(props.show));
  const width = props.style ? (props.style.width ? props.style.width : DEFAULT_SIZE.width) : DEFAULT_SIZE.width;
  const height = props.style ? (props.style.height ? props.style.height : DEFAULT_SIZE.height) : DEFAULT_SIZE.height;
  const direction = props.direction || 'right';
  const directionMap = new Map([
    ['left', { left: 0, top: 0, transform: `translateX(-${100 - position}%)` }],
    ['top', { top: 0, left: 0 , transform: `translateY(-${100 - position}%)`}],
    ['right', { right: 0, top: 0,transform: `translateX(${100 - position}%)` }],
    ['bottom', { bottom: 0, left: 0, transform: `translateY(${100 - position}%)` }],
  ])
  useEffect(() => {
    if(props.show === true) {
      setPosition(() => 100);
    } else {
      setPosition(() => 0)
    }
  }, [props.show])
  return <div 
    style={{ 
      width,
      height,
      background: 'orange',
      ...(directionMap.get(direction)),
      ...props.style,
      position: 'absolute',
      // transform: `translate(${100 - position}%)`,
      transition: 'all 0.4s ease-in-out'
    }}
  >
    {
      props.children
    }
  </div>
}

export default Drawer;
