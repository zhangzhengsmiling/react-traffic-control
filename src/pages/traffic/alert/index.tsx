import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';

import AlertList from './alert-list';
import DropSelect from '../../../components/drop-select';
import GMap from '../../../components/map';
import Marker from '../../../components/map/marker';
import Drawer from '../../../components/drawer';
import Iconfont from '../../../components/iconfont';
import { levelMap, levelColorMap, levelEnum } from './constants'

declare const AMap;
// declare const Loca;
// const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];


interface IPropAlert {
  alertList: any[];
  filterOption: { type: string; level: string };
  setFilterOption: any;
}
let _map = null;

const renderSVG = (level: number) => <svg style={{ marginRight:'10px' }} width="8" height="8">
  <circle cx="4" cy="4" r="4" fill={levelColorMap.get(level)} />
</svg>;

enum AlertTypeEnum {
  '交通拥堵' = '交通拥堵',
  '交通事故' = '交通事故',
  '设备故障' = '设备故障',
  '天气异常' = '天气异常',
}

const renderIcon = (type: string) => {
  switch(type) {
    case '交通事故':
      return <Iconfont type="iconjiaotongshigu" style={{ position: 'absolute', color: '#fff', fontSize: '20px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />;
    case '交通拥堵':
      return <Iconfont type="iconyongdudu" style={{ position: 'absolute', color: '#fff', fontSize: '20px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />;
    case '天气异常':
      return <Iconfont type="icontianqi1" style={{ position: 'absolute', color: '#fff', fontSize: '20px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />;
    case '设备故障':
      return <Iconfont type="iconguzhangzhuangtai" style={{ position: 'absolute', color: '#fff', fontSize: '20px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />;
    default:
      return <Iconfont type="icongaojingguanli" style={{ position: 'absolute', color: '#fff', fontSize: '20px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
  }
}

const testAlertList = [
  { title: '测试告警', time: '2020-04-18', type: '交通拥堵', level: levelEnum.SERIOUS, status: '', position: [120.057746,30.302383] },
  { title: '测试告警', time: '2020-04-18', type: '交通事故', level: levelEnum.URGENT, status: '',  position: [120.069483, 30.286755]},
  { title: '测试告警', time: '2020-04-18', type: '设备故障', level: levelEnum.NORMAL, status: '', position: [120.045301, 30.241719] },
  { title: '测试告警', time: '2020-04-18', type: '天气异常', level: levelEnum.SLIGHT, status: '' },
];

const Alert = (props: any) => {
  const [filterOption, setFilterOption]: [any, any]= useState({ type: 'all', level: 'all' });
  // const filterOption = props.filterOption;
  // const setFilterOption = props.setFilterOption;
  const [alertList, setAlertList] = useState(testAlertList);
  const [gMapOption, setGMapOption] = useState({ center: CENTER_XIXISHIDI, zoom: 14 });
  const [layers, setLayers] = useState([]);
  return <>
    <GMap
      appKey="264957655c49306d2b11298a1f30cabf"
      className="g-map"
      onCompleted={(map) => {
        let layers = [];
        _map = map;
        // if(/alert/.test(props.location.pathname)) {
        layers = [
          new AMap.TileLayer(),
          // new AMap.TileLayer.RoadNet(),
          new AMap.TileLayer.Traffic(),
          // ...this.props.layers,
        ];
        setAlertList(testAlertList)
        // }
        setLayers(layers)
      }}
      viewMode="3D"
      pitch={50}
      center={gMapOption.center}
      zoom={gMapOption.zoom}
      layers={layers}
    >
      {
        alertList
          .filter(item => item.position)
          .map((item, index) => 
            <Marker key={`marker-${index}`} position={item.position as [number, number]}
              content={
                <div className="radial" style={{ transform: 'translate(-50%, -50%)' }}>
                 {
                   renderIcon(item.type)
                 }
                </div>
              }
              onClick={(e, map) => {
                setGMapOption(prevOption => ({
                  ...prevOption,
                  zoom: 18,
                  center: item.position as [number, number],
                }))
                var infoWindow = new AMap.InfoWindow({
                  anchor: 'middle-left',
                  content: renderToString(<div style={{ width: 'auto', height: 'auto', color: '#fff', padding: '10px' }}>
                    <div style={{ margin: '10px 0' }}> {item.title} </div>
                    <div style={{ margin: '10px 0' }}>告警时间： {item.time} </div>
                    <div style={{ margin: '10px 0' }}>告警类型： {item.type} </div>
                    <div style={{ margin: '10px 0' }}>告警等级： {levelMap.get(item.level)} </div>
                    <div style={{ margin: '10px 0' }}>发生位置： {`${item.position[0]}E，${item.position[1]}N`} </div>
                  </div>),
                  offset: { x: 20, y: -30 }
                });
                infoWindow.open(map,item.position);
              }}
            />
          )
      }
    </GMap>
    <Drawer
      show={true}
      style={{ width: '400px', height: '800px', background: 'rgba(9, 21, 42, 0.8)', top: '12vh', padding: '20px' }}
      direction="left"
    >
        <div style={{ width: '100%', height: '100%', background: 'rgb(9, 21, 42)' }}>
        <div style={{ width: '100%', height: '32px' }}>
          <div style={{ width: '170px', height: 'auto', display: 'inline-block' }}>
            <DropSelect 
              menu={[
                { key: 'all', value: '所有告警等级', icon: '' },
                { key: levelEnum.URGENT, value: '紧急', icon: renderSVG(levelEnum.URGENT) },
                { key: levelEnum.SERIOUS, value: '严重', icon: renderSVG(levelEnum.SERIOUS) },
                { key: levelEnum.NORMAL, value: '一般', icon: renderSVG(levelEnum.NORMAL) },
                { key: levelEnum.SLIGHT, value: '轻微', icon: renderSVG(levelEnum.SLIGHT) },
              ]}
              placeholder="请选择告警等级"
              filterOption={filterOption.level}
              onChange={(key: any) => {
                setFilterOption(prev => ({
                  ...prev,
                  level: key,
                }))
              }}
            />
          </div>
          <div style={{ width: '170px', height: 'auto', marginLeft: '20px', display: 'inline-block' }}>
            <DropSelect
              menu={[
                { key: 'all', value: '所有告警类型', icon: '' },
                { key: '交通事故', value: '交通事故', icon: <Iconfont style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }} type="iconjiaotongshigu" />},
                { key: '交通拥堵', value: '交通拥堵', icon: <Iconfont style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }} type="iconyongdudu" />},
                { key: '设备故障', value: '设备故障', icon: <Iconfont style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }} type="iconguzhangzhuangtai" />},
                { key: '天气异常', value: '天气异常', icon: <Iconfont style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }} type="icontianqi1"></Iconfont>},
              ]}
              filterOption={filterOption.type}
              placeholder="请选择告警类型"
              onChange={(key: any) => {
                console.log(key)
                setFilterOption(prev => ({
                  ...prev,
                  type: key,
                }))
              }}
            />
          </div>
        </div>
        <div style={{ color: '#fff', width: '100%', height: '2px', background: 'rgba(114, 130, 213, 0.4)', margin: '16px 0' }}></div>
        <div style={{ width: '100%', height: '712px' }}>
          <AlertList
            alertList={
              testAlertList
              .map(item => {
                console.log(item);
                return item;
              })
              .filter(item => filterOption.level === 'all' ? true : item.level === filterOption.level)
              .filter(item => filterOption.type === 'all' ? true : item.type === filterOption.type)
            }
            filter={{
              level: '',
              type: '',
            }}
          />
        </div>
      </div>
    </Drawer>
  </>
}

export default Alert;
