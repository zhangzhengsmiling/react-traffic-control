import React, { useState, useEffect, useMemo } from 'react';
import { renderToString } from 'react-dom/server';

import AlertList from './alert-list';
import DropSelect from '../../../components/drop-select';
import GMap from '../../../components/map';
import Marker from '../../../components/map/marker';
import Drawer from '../../../components/drawer';

declare const AMap;
declare const Loca;
const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];

interface IPropAlert {
  alertList: any[];
  filterOption: { type: string; level: string };
  setFilterOption: any;
}
let _map = null;

const testAlertList = [
  { title: '测试告警', time: '2020-04-18', type: '交通拥堵', level: '严重', status: '', position: [120.057746,30.302383] },
  { title: '测试告警', time: '2020-04-18', type: '交通事故', level: '紧急', status: '',  position: [120.069483, 30.286755]},
  { title: '测试告警', time: '2020-04-18', type: '设备故障', level: '一般', status: '', position: [120.045301, 30.241719] },
  { title: '测试告警', time: '2020-04-18', type: '天气异常', level: '轻微', status: '' },
];

// const alertlist = 

const Alert = (props: any) => {
  const [filterOption, setFilterOption] = useState({ type: 'all', level: 'all' });
  // const filterOption = props.filterOption;
  // const setFilterOption = props.setFilterOption;
  const [alertList, setAlertList] = useState(testAlertList);
  const [gMapOption, setGMapOption] = useState({ center: CENTER_XIXISHIDI, zoom: 14 });
  const [layers, setLayers] = useState([]);

  // const [heatMapData]
  // useEffect()
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
                <div className="radial" style={{ transform: 'translate(-50%, -50%)' }}></div>
              }
              onClick={(e, map) => {
                setGMapOption(prevOption => ({
                  ...prevOption,
                  zoom: 18,
                  center: item.position as [number, number],
                }))
                var infoWindow = new AMap.InfoWindow({
                  anchor: 'middle-left',
                  content: renderToString(<div style={{ width: 'auto', height: 'auto', color: '#fff' }}>
                    <div> {item.title} </div>
                    <div>告警时间： {item.time} </div>
                    <div>告警类型： {item.type} </div>
                    <div>告警等级： {item.level} </div>
                    <div>发生位置： {`${item.position[0]}E，${item.position[1]}N`} </div>
                  </div>),
                  offset: { x: 10, y: -30 }
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
                { key: '紧急', value: '紧急', icon: '' },
                { key: '严重', value: '严重', icon: '' },
                { key: '一般', value: '一般', icon: '' },
                { key: '轻微', value: '轻微', icon: '' },
              ]}
              placeholder="请选择告警等级"
              filterOption={filterOption.level}
              onChange={(key: any) => {
                console.log(key)
                debugger
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
                { key: '交通事故', value: '交通事故', icon: <circle cx="4" cy="4" r="4" fill="green" /> },
                { key: '交通拥堵', value: '交通拥堵', icon: <circle cx="4" cy="4" r="4" fill="green" /> },
                { key: '设备故障', value: '设备故障', icon: <circle cx="4" cy="4" r="4" fill="green" /> },
                { key: '天气异常', value: '天气异常', icon: <circle cx="4" cy="4" r="4" fill="green" /> },
              ]}
              filterOption={filterOption.type}
              placeholder="请选择告警类型"
              onChange={(key: any) => {
                // if(key === 'all') return setAlertList(testAlertList)
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
