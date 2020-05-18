import React, { useState }  from 'react';
import { renderToString } from 'react-dom/server'
import echarts from 'echarts';
import 'echarts-liquidfill';
import { Row, Col } from 'antd';

import GMap from '../../../components/map';
import Drawer from '../../../components/drawer';
import Marker from '../../../components/map/marker';
import BarChart from '../../../components/bar-chart-v2';
// import WaveChart from '../../../components/wave-chart';

import './style.scss';

declare const AMap;
// declare const Loca;
const CENTER_WESTLAKE: [number, number] = [120.04819, 30.243851];
const CENTER_XIXISHIDI: [number, number] = [120.046033, 30.270448];


const renderPercentChart = (domContainer: Element, value: number = 0.555) => {
  const option = {
    series: [{
      type: 'liquidFill',
      radius: '80%',
      color: ['#195ba6'],
      center: ['50%', '50%'],
      data: [value, value, value, value, value],
      backgroundStyle: {
        borderWidth: 2,
        borderColor: '#1789fb',
        color: '#1c233f',
      },
      outline: {
        itemStyle: {
          borderWidth: 5,
          borderColor: '#1789fb',
          borderType: 'dashed',
        }
      },
      label: {
        normal: { //此处没有生效，本地生效
          textStyle: {
            fontSize: 20,
            color: '#e6e6e6',
          },
        },
      },
    }]
  };
  const chart = echarts.init(domContainer);
  chart.setOption(option);
}

const renderLineChart = (domContainer: Element) => {
  const data = [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ];
  const dataOut = [160.55, 228.35, 114.02, 109.55, 119.57, 156.14, ];
  const xAxis = ['A', 'B', 'C', 'D', 'E', 'F'];
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(25, 89, 163,0)'
            }, {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)',
            }, {
              offset: 1,
              color: 'rgba(25, 89, 163,0)'
            }],
            global: false
          }
        },
      },
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      // containLabel: true
    },
    xAxis: [{
      type: 'category',
      axisLine: {
        show: true
      },
      splitArea: {
        // show: true,
        color: '#f00',
        lineStyle: {
          color: '#f00'
        },
      },
      axisLabel: {
        color: '#fff'
      },
      splitLine: {
          show: false
      },
      boundaryGap: false,
      data: xAxis,
    }],

    yAxis: [{
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        margin: 20,
        textStyle: {
          color: '#d1e6eb',
        },
      },
      axisTick: {
        show: false,
      },
    }],
    series: [{
      name: '注册总量',
      type: 'line',
      // smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: "#00ca95",
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5,
        },
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#00ca95',
        }
      },
      itemStyle: {
        color: "rgb(25, 89, 163)",
        borderColor: "#fff",
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2,
      },
      tooltip: {
        show: false
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(25, 89, 163,0.3)'
          },
          {
            offset: 1,
            color: 'rgba(25, 89, 163,0)'
          }
          ], false),
          shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 20
        }
      },
      data,
    },{
      name: '出闸数',
      type: 'line',
      // smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: "#00ca95",
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5,
        },
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: 'rgb(255, 81, 81)',
        }
      },
      itemStyle: {
        color: "rgb(255, 81, 81)",
        borderColor: "#fff",
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2,
      },
      tooltip: {
        show: false
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 81, 81, 0.3)'
          },
          {
            offset: 1,
            color: 'rgba(255, 81, 81, 0)'
          }
          ], false),
          shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 20
        }
      },
      data: dataOut,
    }]
  };
  const chart = echarts.init(domContainer);
  chart.setOption(option);
}

const getColor = (satiration: number) => {
  if(satiration <= 0.5) {
    return 'rgba(0, 96, 0, 0.8)';
  } else if(satiration < 0.7) {
    return 'rgba(255, 146, 36, 0.8)';
  } else {
    return 'rgb(206, 0, 0)';
  }
}

interface IParking {
  parkingId: number;
  name: string;
  position: [number, number];
  overview: {
    total: number;
    rest: number;
    todayIn: number;
    todayOut: number;
  }
}

const parkingList: IParking[] = [
  { parkingId: 1, name: '测试停车场1', position: [120.046033, 30.270448], overview: { total: 125, rest: 44, todayIn: 226, todayOut: 126 } },
  { parkingId: 2, name: '测试停车场2', position: [120.060033, 30.27330448], overview: { total: 128, rest: 88, todayIn: 236, todayOut: 106 } },
  { parkingId: 3, name: '测试停车场3', position: [120.0326033, 30.272220448], overview: { total: 100, rest: 44, todayIn: 556, todayOut: 326 } },
  { parkingId: 4, name: '测试停车场4', position: [120.0606033, 30.27110448], overview: { total: 78, rest: 4, todayIn: 103, todayOut: 86 } },
]

const Parking = (props: any) => {
  const [gMapOption, setGMapOption] = useState({ center: CENTER_XIXISHIDI, zoom: 14 });
  return <div className="parking">
    <GMap
      appKey="264957655c49306d2b11298a1f30cabf"
      className="g-map"
      viewMode="3D"
      pitch={50}
      center={gMapOption.center}
      zoom={gMapOption.zoom}
      layers={[]}
    >
      {
        parkingList.map((item, index) => {
          const saturation: number = (item.overview.total - item.overview.rest) / item.overview.total;
          return <Marker
            key={`parking-marker-${index}`}
            position={item.position}
            content={
              <div className="marker-parking">
                <div className="circle" style={{ background: getColor(saturation) }} >
                  <div style={{ width: '100%', height: '100%', background: 'rgb(22, 55, 101)', borderRadius: '50%', lineHeight: '30px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>P</div>
                </div>
                <div className="bar" />
                <div className="dot" />
              </div>
            }
            onClick={(e, map) => {
              setGMapOption(prev => ({
                ...prev,
                center: item.position,
              }))
              var infoWindow = new AMap.InfoWindow({
                anchor: 'middle-left',
                content: renderToString(<div className="parking-infowindow">
                  <div className="parking-infowindow-title"> {item.name} </div>
                  <div className="parking-infowindow-container flex parking-overview">
                    <div className="item">
                      <div className="label">总车位数</div>
                      <div className="value"> {item.overview.total} </div>
                    </div>
                    <div className="item">
                      <div className="label">剩余车位数</div>
                      <div className="value"> {item.overview.rest} </div>
                    </div>
                    <div className="item">
                      <div className="label">当日入闸数</div>
                      <div className="value"> {item.overview.todayIn} </div>
                    </div>
                    <div className="item">
                      <div className="label">当日出闸数</div>
                      <div className="value"> {item.overview.todayOut} </div>
                    </div>
                  </div>
                  <div className="parking-infowindow-container">
                    <span className="sub-title">停车场饱和度</span>
                    <div id="percent-chart" />
                  </div>
                  <div className="parking-infowindow-container">
                    <span className="sub-title">停车入闸趋势</span>
                    <div id="line-chart" />
                  </div>
                </div>),
                offset: { x: 15, y: -100 }
              });
              infoWindow.open(map, item.position);
              setTimeout(() => {
                const percentChart = document.querySelector('#percent-chart');
                const lineChart = document.querySelector('#line-chart');
                if(percentChart) {
                  renderPercentChart(percentChart, saturation);
                }
                if(lineChart) {
                  renderLineChart(lineChart);
                }
              }, 50)
            }}
          />
        })
      }
    </GMap>
    <Drawer
      show={true}
      style={{ width: '400px', height: '800px', background: 'rgba(9, 21, 42, 0.8)', top: '12vh', padding: '20px' }}
      direction="left"
    >
      <div className="parking-drawer">
        <div className="seq-list">
          <div className="list-title">
            <Row>
              <Col className="left" span={6}>停车场名称</Col>
              <Col className="middle" span={12}>车位总数</Col>
              <Col className="right" span={6}>饱和度</Col>
            </Row>
          </div>
          <div className="list-body">
          {
            parkingList.map((item, index) => {
              return <div className="list-item">
                <Row>
                  <Col className="left" span={8}> {item.name} </Col>
                  <Col className='middle' span={8}> {item.overview.total} </Col>
                  <Col className="right" span={8}> {Math.round((item.overview.total - item.overview.rest) / item.overview.total * 100)}% </Col>
                </Row>
              </div>
            })
          }
          </div>
        </div>
        <div style={{ width: '100%', height: '250px', marginTop: '16px', background: 'rgb(25, 48, 92)', padding: '16px' }}>
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}> 停车场饱和度 </div>
          <BarChart data={{
            xAxis: parkingList.map(item => item.name),
            yAxis: parkingList.map(item => Math.round((item.overview.total - item.overview.rest) / item.overview.total * 100)),
          }} />
        </div>
      </div>
    </Drawer>
  </div>
}

export default Parking;
