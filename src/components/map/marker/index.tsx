import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import withPureRender from '../../../hocs/withPureRender';

declare const AMap;

enum MarkerEventEnum {
  CLICK = 'click',
  DBCLICK = 'dbclick',
  RIGHTCLICK = 'rightclick',
  MOUSEMOVE = 'mousemove',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEDOWN = 'mousedown',
  MOUSEUP = 'mouseup',
  DRAGSTART = 'dragstart',
  DRAGGING = 'dragging',
  DRAGEND = 'dragend',
  MOVING = 'moving',
  MOVEEND =  'moveend',
  MOVEALONG = 'movealong',
}

interface IPropsMarker {
  map?: any;
  position: [number, number];
  content?: any;
  onClick?: Function;
  onDbClick?: Function;
  onRightClick?: Function;
  onMouseMove?: Function;
  onMouseOver?: Function;
  onMouseOut?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onMoving?: Function;
  onMoveEnd?: Function;
  onMoveAlong?: Function;
  onDragStart?: Function;
  onDragging?: Function;
  onDragEnd?: Function;
}

// const TestComp = () => <div style={{ width: '20px', height: '20px', background: 'red' }}></div>

@withPureRender
export default class Marker extends Component<IPropsMarker, {}> {
  marker: any = null;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.map) return;
    this.renderMarker(this.props.map, this.props.position, this.props.content);
  }

  componentDidUpdate() {
    this.renderMarker(this.props.map, this.props.position, this.props.content);
  }

  componentWillUnmount() {
    if(this.marker) {
      this.offMarkerEvents(this.marker, this.props)
      this.props.map.remove(this.marker);
    }
  }

  bindMarkerEvents = (marker, props) => {
    // switch(props.)
    if(props.onClick) {
      marker.on(MarkerEventEnum.CLICK, this.onMarkerEventTriggered);
    }
    if(props.onDbClick) {
      marker.on(MarkerEventEnum.DBCLICK, this.onMarkerEventTriggered);
    }
    if(props.onRightClick) {
      marker.on(MarkerEventEnum.RIGHTCLICK, this.onMarkerEventTriggered);
    }
    if(props.onMouseMove) {
      marker.on(MarkerEventEnum.MOUSEMOVE, this.onMarkerEventTriggered);
    }
    if(props.onMouseOver) {
      marker.on(MarkerEventEnum.MOUSEOVER, this.onMarkerEventTriggered);
    }
    if(props.onMouseOut) {
      marker.on(MarkerEventEnum.MOUSEOUT, this.onMarkerEventTriggered);
    }
    if(props.onMouseDown) {
      marker.on(MarkerEventEnum.MOUSEDOWN, this.onMarkerEventTriggered);
    }
    if(props.onMouseUp) {
      marker.on(MarkerEventEnum.MOUSEUP, this.onMarkerEventTriggered);
    }
    if(props.onDragStart) {
      marker.on(MarkerEventEnum.DRAGSTART, this.onMarkerEventTriggered);
    }
    if(props.onDragging) {
      marker.on(MarkerEventEnum.DRAGGING, this.onMarkerEventTriggered);
    }
    if(props.onDragEnd) {
      marker.on(MarkerEventEnum.DRAGEND, this.onMarkerEventTriggered);
    }
    if(props.onMoving) {
      marker.on(MarkerEventEnum.MOVING, this.onMarkerEventTriggered);
    }
    if(props.onMoveEnd) {
      marker.on(MarkerEventEnum.MOVEEND, this.onMarkerEventTriggered);
    }
    if(props.onMoveAlong) {
      marker.on(MarkerEventEnum.MOVEALONG, this.onMarkerEventTriggered);
    }
  }

  offMarkerEvents = (marker, props) => {
    // switch(props.)
    if(props.onClick) {
      marker.off(MarkerEventEnum.CLICK, this.onMarkerEventTriggered);
    }
    if(props.onDbClick) {
      marker.off(MarkerEventEnum.DBCLICK, this.onMarkerEventTriggered);
    }
    if(props.onRightClick) {
      marker.off(MarkerEventEnum.RIGHTCLICK, this.onMarkerEventTriggered);
    }
    if(props.onMouseMove) {
      marker.off(MarkerEventEnum.MOUSEMOVE, this.onMarkerEventTriggered);
    }
    if(props.onMouseOver) {
      marker.off(MarkerEventEnum.MOUSEOVER, this.onMarkerEventTriggered);
    }
    if(props.onMouseOut) {
      marker.off(MarkerEventEnum.MOUSEOUT, this.onMarkerEventTriggered);
    }
    if(props.onMouseDown) {
      marker.off(MarkerEventEnum.MOUSEDOWN, this.onMarkerEventTriggered);
    }
    if(props.onMouseUp) {
      marker.off(MarkerEventEnum.MOUSEUP, this.onMarkerEventTriggered);
    }
    if(props.onDragStart) {
      marker.off(MarkerEventEnum.DRAGSTART, this.onMarkerEventTriggered);
    }
    if(props.onDragging) {
      marker.off(MarkerEventEnum.DRAGGING, this.onMarkerEventTriggered);
    }
    if(props.onDragEnd) {
      marker.off(MarkerEventEnum.DRAGEND, this.onMarkerEventTriggered);
    }
    if(props.onMoving) {
      marker.off(MarkerEventEnum.MOVING, this.onMarkerEventTriggered);
    }
    if(props.onMoveEnd) {
      marker.off(MarkerEventEnum.MOVEEND, this.onMarkerEventTriggered);
    }
    if(props.onMoveAlong) {
      marker.off(MarkerEventEnum.MOVEALONG, this.onMarkerEventTriggered);
    }
  }


  onMarkerEventTriggered = (event) => {
    const { type } = event;
    switch(type) {
      case MarkerEventEnum.CLICK:
        return this.props.onClick(event, this.props.map);
      case MarkerEventEnum.DBCLICK:
        return this.props.onDbClick(event);
      case MarkerEventEnum.RIGHTCLICK:
        return this.props.onRightClick(event);
      case MarkerEventEnum.RIGHTCLICK:
        return this.props.onRightClick(event);
      case MarkerEventEnum.MOUSEOVER:
        return this.props.onMouseOver(event);
      case MarkerEventEnum.MOUSEOUT:
        return this.props.onMouseOut(event);
      case MarkerEventEnum.MOUSEDOWN:
        return this.props.onMouseDown(event);
      case MarkerEventEnum.MOUSEUP:
        return this.props.onMouseUp(event);
      case MarkerEventEnum.DRAGSTART:
        return this.props.onDragStart(event);
      case MarkerEventEnum.DRAGGING:
        return this.props.onDragging(event);
      case MarkerEventEnum.DRAGEND:
        return this.props.onDragEnd(event);
      case MarkerEventEnum.MOVING:
        return this.props.onMoving(event);
      case MarkerEventEnum.MOVEEND:
        return this.props.onMoving(event);
      case MarkerEventEnum.MOVEALONG:
        return this.props.onMoveAlong(event);
      default:
        console.error(`marker event ${type} is not defrined...`)
    }
  }

  renderMarker = (map: any, position: [number, number], content:React.ReactElement, events?: any) => {
    const markerOption = {
      content: content ? renderToString(content) : '',
      position,
      // autoRotation:true,
    }
    if(typeof AMap !== 'undefined') {
      const marker = new AMap.Marker(markerOption);
      this.marker = marker;
      this.bindMarkerEvents(marker, this.props);
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
