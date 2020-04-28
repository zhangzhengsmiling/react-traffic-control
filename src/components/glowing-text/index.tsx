/**
 * 发光文字效果
 */
import React from 'react';

interface IPropsGlowingText {
  style?: any;
  className?: string;
  text: string;
}

const GlowingText = (props: IPropsGlowingText) => {
  // const textShadow = props.style.textShadow || '';
  const defaultTextShadow = '0 0 1em red, 0 0 0.4em red';
  const textShadow = props.style ? (props.style.textShadow ? props.style.textShadow : defaultTextShadow) : defaultTextShadow;
  return <span
    // className="glowing-text"
    className={props.className || ''}
    style={{
      ...props.style,
      textShadow,
    }}
  >
    {props.text}
  </span>
}

export default GlowingText;
