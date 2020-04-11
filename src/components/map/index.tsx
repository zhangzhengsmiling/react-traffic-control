import React from 'react';

import { DEFAULT_VERSION, DEFAULT_MAPSTYLE } from './constants';
import promisify from '../../utils/promisify';

type PromiseErrorFunction = (err: Error|undefined, data: any) => any;

// let AMap = null;
declare let AMap;

export default class Map extends React.Component<{version?:string;mapStyle?: string;appKey: string}, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    map: null,
  }
  mapContainer = null;
  map = null;

  fetchAMapScript = promisify((document:HTMLDocument, version:string, appKey:string, callback: PromiseErrorFunction) => {
    let script: HTMLScriptElement|null = document.querySelector(`#data-${appKey}`);
    if(script) return; // 已加载相同appkey的高德API，跳过重复加载
    // 首次加载脚本
    script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=${version}&key=${appKey}`;
    script.id = `data-${appKey}`;
    document.head.appendChild(script);
    script.onload = () => {
      return callback(undefined, {message: '加载成功', loaded: true})
    }
    // setTimeout(() => {
    //   return callback(new Error('加载脚本超时'), null);
    // }, 3000)
  })

  // 264957655c49306d2b11298a1f30cabf
  // 1.4.15
  componentDidMount() {
    const version = this.props.version || DEFAULT_VERSION;
    const appKey = this.props.appKey || '264957655c49306d2b11298a1f30cabf';
    const mapStyle = this.props.mapStyle || DEFAULT_MAPSTYLE;
    // const script = document.createElement('script');
    // script.src = `https://webapi.amap.com/maps?v=${version}&key=${appKey}`;
    // script.id = `data-${appKey}`;
    // document.head.appendChild(script); 
    // script.onload = () => {
  
    // };
    this.fetchAMapScript(document, version, appKey)
      .then((data: any) => {
        if(data.loaded) {
          try {
            // zoom: 10,  //设置地图显示的缩放级别
            // center: [116.397428, 39.90923],//设置地图中心点坐标
            // layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
            // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
            // viewMode: '2D',  //设置地图模式
            // lang:'zh_cn',  //设置地图语言类型
            this.map = new AMap.Map(this.mapContainer, {
              center:[117.000923,30.675807],
              zoom:14,
              mapStyle, //设置地图的显示样式
              viewMode: '3D',
              pitch: 55,
            });
          } catch(e) {
            console.error('未找到AMap对象，请检查版本号或者appKey是否正确');
          }
        }
      })
  }
  render() {
    return <div style={{ width: '100vw', height: '100vh' }} ref={mapContainer => this.mapContainer = mapContainer} />
  }
}
