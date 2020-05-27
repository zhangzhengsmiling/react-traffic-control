import React, { PureComponent } from 'react';
import * as echarts from 'echarts';
import _ from 'lodash';

import filterProp from '../../utils/filterProp';
import withPureRender from '../../hocs/withPureRender';

import './style.scss';

const limitWidth = 1700;

@withPureRender
export default class BarChart extends PureComponent<any, any> {

  chartDom = null;
  chart = null;
  intervalId = null;

  constructor(props) {
    super(props);
    console.log('');
  }

  init = (props: any) => {
    let { color, data } = props;
    color = color.map(item => {
      if(_.isArray(item)) {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, item)
      } else {
        return item;
      }
    })

    if(this.chartDom) {
      this.chart = echarts.init(this.chartDom);
      // const clientWidth = document.documentElement.clientWidth;
      const fontSize = this.fontSize(14);
      const option = this.getOption(data, color, fontSize);
      this.chart.setOption(option);
      var app = {
        currentIndex: -1,
      };
      let idx = -1;
      this.intervalId = setInterval( () => {
        const clientWidth = document.documentElement.clientWidth;
        // const fontSize = 14 / 1920 * clientWidth;
        const fontSize = this.fontSize(14);
        const option = this.getOption(data, color, fontSize);
        const dataLen = option.series[0].data.length;
        if(dataLen >= 5) {
          const dataZooms = [
            { start: 0, end: 30 },
            { start: 25, end: 60 },
            { start: 60, end: 100 },
          ]
          idx = (idx + 1) % 3;
          option.dataZoom.start = dataZooms[idx].start;
          option.dataZoom.end = dataZooms[idx].end;
        } 
        else {
          option.dataZoom.start = 0;
          option.dataZoom.end = 100;
          // clearInterval(this.intervalId)
          idx = (idx + 1) % dataLen;
          // 取消之前高亮的图形
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            // dataIndex: app.currentIndex
            dataIndex: idx
          });
          app.currentIndex = (app.currentIndex + 1) % dataLen;
          //console.log(app.currentIndex);
          // 高亮当前图形
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            // dataIndex: app.currentIndex,
            dataIndex: idx,
          });
          // 显示 tooltip
          this.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            // dataIndex: app.currentIndex
            dataIndex: idx,
          });
        }
        this.chart.setOption(option, false);
        const target = {
          x: data.xAxis[idx],
          y: data.data.map(item => item[idx]),
        }
        console.log('target', target)
        this.intervalCallback(idx, target);
      }, 3000);
      window.addEventListener('resize', () => {
        // const clientWidth = document.documentElement.clientWidth;
        let fontSize;
        fontSize = this.fontSize(14);
        this.chart.resize();
        this.chart.setOption(this.getOption(data, color, fontSize), false)
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fontSize = font => {
    const clientWidth = document.documentElement.clientWidth;
    if(clientWidth < 1140) {
      return font / 1920 * 1140;
    } else if(clientWidth >= 1140 && clientWidth <= 1920) {
      return font;
    } else if(clientWidth >= 1920) {
      return font / 1920 * clientWidth;
    }
  }

  getOption = (data, color, fontSize = 14) => {
    const clientWidth = document.documentElement.clientWidth;
    let initDataZoom = {
      start: 0,
      end: 30,
    }
    // if(clientWidth <= limitWidth) {
    //   initDataZoom = {
    //     start: 0,
    //     end: 30,
    //   }
    // }
    return {
      // backgroundColor:'#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            fontSize
          }
          // format: (item) => item.name,
        },
      legend: {
        data: data.legend,
        icon: 'circle',
        top: 14,
        textStyle: {
            color: "#fffc",
            fontSize,
        },
        itemWidth: 12,
        itemHeight: 10,
        // itemStyle: {
        //   color: ['green', 'red', 'blue']
        // },
     },
     grid: {
      left: '2%',
      right: '2%',
      bottom: 20,
      top: 54,
      containLabel: true
    },
      xAxis: {
        type: 'category',
        data: data.xAxis,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fffc'
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize
          }
        }
      },
      dataZoom: {
        show: false,
        type: 'slider',
        start: initDataZoom.start,
        end: initDataZoom.end,
        zoomLock: true,
      },
 
      yAxis: {
        type: 'value',
      //  max,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fffc'
          }
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            fontSize
          }
        }
      },
      series: data.data.map((item, index) => ({
        name: data.legend[index],
        type: 'bar',
        barWidth: '12%',
        itemStyle: {
          normal: {
              color: color[index],
          },
        },
        data: item,
      }))
    };
  }

  componentDidMount() {
    clearInterval(this.intervalId);
    this.init(this.props);

  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.intervalId);
    this.init(nextProps);
  }

  intervalCallback = (index: number, target:any) => {
    if(_.isFunction(this.props.callback)) {
      this.props.callback(index, target);
    }
  }

  render() {
    return <div ref={chartDom => this.chartDom = chartDom} {...filterProp(this.props, 'callback')}></div>
  }
}
