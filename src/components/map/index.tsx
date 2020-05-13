import React from 'react';
import _ from 'lodash';

import {
  DEFAULT_VERSION,
  DEFAULT_MAPSTYLE,
  DEFAULT_VIEWMODE
} from './constants';
import promisify from '../../utils/promisify';
import withPureRender from '../../hocs/withPureRender';
import Marker from './marker';

// let AMap = null;
declare let AMap;

enum MapEventEnum {
  ZOOM_START = 'zoomstart',
  ZOOM_END = 'zoomend',
  MOVE_START = 'movestart',
  MOVE_END = 'moveend',
  MAP_MOVE = 'mapmove',
}

type MapEventsHandler = (status: { center: [number, number], zoom: number }) => any;
type PromiseErrorFunction = (err: Error|undefined, data: any) => any;
interface IPropsMap {
  version?: string;
  mapStyle?: string;
  appKey: string;
  center?: [number, number];
  zoom?: number;
  viewMode?: string;
  pitch?: number;
  skyColor?: string;
  style?: Object;
  className?: string;
  layers?: any[];
  onCompleted?: Function;
  beforeDestroy?: Function;
  onZoomStart?: MapEventsHandler;
  onZoomEnd?: MapEventsHandler;
  onMoveStart?: MapEventsHandler;
  onMoveEnd?: MapEventsHandler;
  onMapMove?: MapEventsHandler;
}

// const DEFAULT_LAYERS = [new AMap.TileLayer()];

@withPureRender
export default class Map extends React.Component<IPropsMap, {}> {
  mapContainer = null;
  map = null;

  constructor(props) {
    super(props);
  }


  // 264957655c49306d2b11298a1f30cabf
  // 1.4.15
  componentDidMount() {
    const version = this.props.version || DEFAULT_VERSION;
    const appKey = this.props.appKey;
    const mapStyle = this.props.mapStyle || DEFAULT_MAPSTYLE;
    const center = this.props.center;
    const zoom = this.props.zoom || 16;
    const viewMode = this.props.viewMode || DEFAULT_VIEWMODE;
    const pitch = this.props.pitch;
    const skyColor = this.props.skyColor || '#ffffff';
    // const layers = this.props.layers ? () : 
    this.fetchAMapScript(document, version, appKey)
      .then((data: any) => {
        if(data.loaded) {
          try {
            // zoom: 10,  //设置地图显示的缩放级别
            // center: [116.397428, 39.90923],//设置地图中心点坐标
            // layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
            // mapStyle: 'amap:// styles/whitesmoke',  //设置地图的显示样式
            // viewMode: '2D',  //设置地图模式
            // lang:'zh_cn',  //设置地图语言类型
            const layers = [
              new AMap.TileLayer(),
              // new AMap.TileLayer.RoadNet(),
              // new AMap.TileLayer.Traffic(),
              ...this.props.layers,
            ];
            this.map = new AMap.Map(this.mapContainer, {
              viewMode,
              skyColor,
              animateEnable: true,
            });
            this.setMapOption(this.map, {
              center,
              zoom,
              mapStyle,
              // viewMode,
              pitch,
              layers,
            })
            this.map.on('complete', () => {
              if(_.isFunction(this.props.onCompleted)) {
                this.props.onCompleted(this.map);
              }
            })
            // 绑定事件监听
            this.bindMapEvents(this.props);
            // func()
            this.forceUpdate();
          }catch(error) {
            console.error(error.message);
          }
        }
      })
  }

  componentDidUpdate() {
    if(typeof AMap === 'undefined') return;
    const mapStyle = this.props.mapStyle;
    const center = this.props.center;
    const zoom = this.props.zoom;
    const pitch = this.props.pitch;
    const layers = [new AMap.TileLayer(), ...this.props.layers];
    this.setMapOption(this.map, {
      mapStyle,
      center,
      zoom,
      pitch,
      layers,
    });
  }

  componentWillUnmount() {
    if(_.isFunction(this.props.beforeDestroy))
      this.props.beforeDestroy();
    this.destroy();
  }

  setMapOption = (map, option) => {
    const {
      center,
      zoom,
      mapStyle, //设置地图的显示样式
      pitch,
      layers,
    } = option;
    if(!map) return;
    if(center) map.setCenter(center);
    if(zoom) map.setZoom(zoom);
    if(mapStyle) map.setMapStyle(mapStyle);
    // if(viewMode) map.setViewMode(viewMode);
    if(pitch) map.setPitch(pitch);
    // if(animateEnable) map.setAniam
    if(layers) map.setLayers(layers);
    // if(skyColor) map.setSykyColor(skyColor);
  }

  // 加载高德地图脚本
  fetchAMapScript = promisify((document:HTMLDocument, version:string, appKey:string, callback: PromiseErrorFunction) => {
  let script: HTMLScriptElement|null = document.querySelector(`#data-${appKey}`);
    if(script) return callback(undefined, {message: '加载成功', loaded: true}); // 已加载相同appkey的高德API，跳过重复加载
    // 首次加载脚本
    let scriptLoca = document.createElement('script');
    scriptLoca.src = `http://webapi.amap.com/loca?key=${appKey}&v=1.3.2`;
    script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=${version}&key=${appKey}`;
    script.id = `data-${appKey}`;
    document.head.appendChild(script);
    script.onload = () => {
      document.head.append(scriptLoca);
      scriptLoca.onload = () => {
        return callback(undefined, {message: '加载成功', loaded: true});
      }
    }
  })

  // 绑定地图事件监听
  bindMapEvents = props => {
    if(props.onZoomStart)
      this.map.on(MapEventEnum.ZOOM_START, this.onMapEventTriggered)
    if(props.onZoomEnd)
      this.map.on(MapEventEnum.ZOOM_END, this.onMapEventTriggered)
    if(props.onMapMove)
      this.map.on(MapEventEnum.MAP_MOVE, this.onMapEventTriggered)
    if(props.onMoveStart)
      this.map.on(MapEventEnum.MOVE_START, this.onMapEventTriggered)
    if(props.onMoveEnd)
      this.map.on(MapEventEnum.MOVE_END, this.onMapEventTriggered);
  }

  // 地图事件解绑
  offMapEvents = props => {
    if(props.onZoomStart)
      this.map.off(MapEventEnum.ZOOM_START, this.onMapEventTriggered)
    if(props.onZoomEnd)
      this.map.off(MapEventEnum.ZOOM_END, this.onMapEventTriggered)
    if(props.onMapMove)
      this.map.off(MapEventEnum.MAP_MOVE, this.onMapEventTriggered)
    if(props.onMoveStart)
      this.map.off(MapEventEnum.MOVE_START, this.onMapEventTriggered)
    if(props.onMoveEnd)
      this.map.off(MapEventEnum.MOVE_END, this.onMapEventTriggered);
  }

  // 事件委托处理器
  onMapEventTriggered = (event: {type: string}) => {
    console.log(event.type);
    const status = {
      zoom: this.map.getZoom(),
      center: this.map.getCenter(),
      bounds: this.map.getBounds(),
      // city: this.map.getCity(),
    }
    switch(event.type) {
      case MapEventEnum.ZOOM_START:
        if(_.isFunction(this.props.onZoomStart)) {
          return this.props.onZoomStart(status);
        }
        break;
      case MapEventEnum.ZOOM_END:
        if(_.isFunction(this.props.onZoomEnd)) {
          return this.props.onZoomEnd(status);
        }
        break;
      case MapEventEnum.MAP_MOVE:
        if(_.isFunction(this.props.onMapMove)) {
          return this.props.onMapMove(status);
        }
        break;
      case MapEventEnum.MOVE_START:
        if(_.isFunction(this.props.onMoveStart)) {
          return this.props.onMoveStart(status);
        }
        break;
      case MapEventEnum.MOVE_END:
        if(_.isFunction(this.props.onMoveEnd)) {
          return this.props.onMoveEnd(status);
        }
        break
      default:
        return console.error('map event,' + event.type);
    }
  }

  // 地图组件清理工作
  destroy = () => {
    if(!this.map) return;
    this.offMapEvents(this.props);
    this.map && this.map.destroy();
  }

  renderChildren = (children) => {
    if(children === undefined) return;
    if(!_.isArray(children)) children = [children];
    console.log(children)
    if(_.isArray(children)) {
      return children.map((item, index) => {
        const compName = item.type.displayName;
        switch(compName) {
          case 'Marker':
            return <Marker key={`${compName}-${index}`} map={this.map} {...item.props} />;
        }
      })
    }
  }

  render() {
    // this.renderChildren(this.props.children)
    return <div
      className={this.props.className}
      style={this.props.style}
      ref={mapContainer => this.mapContainer = mapContainer}
    >
      {
        this.renderChildren(this.props.children)
      }
    </div>
  }
}
