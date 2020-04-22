import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import withPureRender from '../../../hocs/withPureRender';

declare const AMap;

const TestComp = () => <div style={{ width: '20px', height: '20px', background: 'red' }}></div>

@withPureRender
export default class Marker extends Component<{map?: any;position:[number, number];content?:any;}, {}> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(renderToString(this.props.content))
    this.renderMarker(this.props.map, this.props.position, this.props.content);
  }

  componentDidUpdate() {
    this.renderMarker(this.props.map, this.props.position, this.props.content);
  }

  renderMarker = (map: any, position: [number, number], content?:React.ReactElement) => {
    const markerOption = {
      content: content ? renderToString(content) : '',
      position,
      // autoRotation:true,
    }
    if(typeof AMap !== 'undefined') {
      const marker = new AMap.Marker(markerOption);
      if(!map) {
        console.error('Marker 组件必须作为Map组件的子组件');
      } else {
        map.add(marker);
      }
    }
  }

  render() {
    return ''
  }

}
