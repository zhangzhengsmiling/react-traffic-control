import React from 'react';

interface IPropContainerBox {
  title: string;
  content: React.ReactElement | string;
  containerStyle?: any;
  titleStyle?: any;
  contentStyle?: any;
  containerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const DEFAULT_CONTAINER_STYLE = {
  width: '100%',
  height: 'auto',
  border: '2px solid purple',
  marginTop: '20px',
}

const DEFAULT_TITLE_STYLE = {
  width: '140px',
  height: 'auto',
  transform: 'translate(20%, -50%)',
  textAlign: 'center',
  background: 'rgb(9, 21, 42)',
  color: '#fff',
  fontWeight: 500,
  fontSize: '18px',
}

const DEFAULT_CONTENT_STYLE = {
  width: '100%',
  height: '200px',
  padding: '0 12px 12px',
  color: '#fff',
}

const ContainerBox = (props: IPropContainerBox) => {
  const containerStyle = props.containerStyle || DEFAULT_CONTAINER_STYLE;
  const titleStyle = props.titleStyle || DEFAULT_TITLE_STYLE;
  const contentStyle = props.contentStyle || DEFAULT_CONTENT_STYLE;
  return <div style={containerStyle}>
    <div style={titleStyle}>
      { props.title }
    </div>
    <div style={contentStyle}>
      { props.content }
    </div>
  </div>
}

export default ContainerBox;
