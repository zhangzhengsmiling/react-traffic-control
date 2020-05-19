import React from 'react';
import echarts from 'echarts';
import 'echarts-liquidfill';

export default class WaveChart extends React.Component {

  domContainer: Element = null;
  chart: any = null;

  componentDidMount() {
    const data = [0.1, 0.2, 0.3, 0.4];
    const radius = '35%';
    const labelTextStyle = {
      color: '#fff8',
      insideColor: 'yellow',
      fontSize: 16,
    }
    const option = {
    // backgroundColor:'#04184A',
      series: [{
        type: 'liquidFill',
        //data: [0.6, 0.5, 0.4, 0.3],
        data: [data[0], data[0] - 0.05, data[0] - 0.1],
        radius,
        // 水球颜色
        color: ['rgb(125, 125, 255)', 'rgb(147, 147, 255)', 'rgb(170, 170, 255)'],
        center: ['33%', '33%'],
        outline: {
          borderDistance: 5,
          itemStyle: {
            borderWidth: 5,
            borderColor: 'rgb(125, 125, 255)',
          },
        },
        label: {
          normal: {
            textStyle: labelTextStyle,
            formatter: (series) => {
              const data = series.data;
              return `交通事故\n\n${Math.round(data * 100)}%`
            },
          }
        },
        // 内图 背景色 边
        backgroundStyle: {
          color: 'rgba(4,24,74,0.8)',
          // borderWidth: 5,
          // borderColor: 'red',
        }
      },
      {
        type: 'liquidFill',
        //data: [0.6, 0.5, 0.4, 0.3],
        data: [data[1],data[1] - 0.05, data[1] - 0.1],
        radius,
        // 水球颜色
        color: ['#49d088', '#38b470', '#2aaf66'],
        center: ['66%', '33%'],
        outline: {
          borderDistance: 5,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#13FDCE',
          },
        },
        label: {
          normal: {
            textStyle: labelTextStyle,
            formatter: (series) => {
              const data = series.data;
              return `交通拥堵\n\n${Math.round(data * 100)}%`
            }
          },
        },
      // 内图 背景色 边
        backgroundStyle: {
          color: 'rgba(4,24,74,0.8)',
          // borderWidth: 5,
          // borderColor: 'red',
        }
      },
      {
        type: 'liquidFill',
        //data: [0.6, 0.5, 0.4, 0.3],
        data: [data[2],data[2] - 0.05, data[2] - 0.1],
        radius,
        // 水球颜色
        color: ['#FE5555', '#F07581', '#FB5E61'],
        center: ['33%', '80%'],
        // outline  外边
        outline: {
          // show: false
          borderDistance: 5,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#FE5555',
          },
        },
        label: {
          normal: {
            textStyle: labelTextStyle,
            formatter: (series) => {
              const data = series.data;
              return `设备故障\n\n${Math.round(data * 100)}%`
            }
          }
        },
        // 内图 背景色 边
        backgroundStyle: {
          color: 'rgba(4,24,74,0.8)',
          // borderWidth: 5,
          // borderColor: 'red',
        }
      },
      {
        type: 'liquidFill',
        //data: [0.6, 0.5, 0.4, 0.3],
        data: [data[3], data[3] - 0.05, data[3] - 0.1],
        radius,
        // 水球颜色
        color: ['#FFBF11', '#F4B30E', '#EACE36'],
        center: ['66%', '80%'],
        // outline  外边
        outline: {
          // show: false
          borderDistance: 5,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#FFBF11',
          },
        },
        label: {
          normal: {
            textStyle: labelTextStyle,
            formatter: (series) => {
              const data = series.data;
              return `天气异常\n\n${Math.round(data * 100)}%`
            }
          },
        },
        // 内图 背景色 边
        backgroundStyle: {
          color: 'rgba(4,24,74,0.8)',
          // borderWidth: 5,
          // borderColor: 'red',
        }
      }]
    };
    if(this.domContainer) {
      this.chart = echarts.init(this.domContainer);
      this.chart.setOption(option);
    }
  }

  render() {
    return <div ref={domContainer => this.domContainer = domContainer} style={{ width: '100%', height: '350px' }} />
  }
}


