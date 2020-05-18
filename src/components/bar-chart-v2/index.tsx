import React from 'react';
import echarts from 'echarts';

interface IPropBarChartV2 {
  data: {
    xAxis: (string | number)[],
    yAxis: number[],
  }
}

const createSvg = (shadowColor, shadowBlur) => `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
      x="0px" y="0px" 
      viewBox="0 0 32 128"
      xml:space="preserve"
  >
    <style>
        .st2 {
            fill: transparent;
            stroke: ${shadowColor};
            stroke-width: ${shadowBlur}px;
            filter: url(#chart-inset-shadow);
        }
    </style>
    <defs>
        <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
        <feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${shadowBlur * 0.75}" />
        <feMerge>
          <feMergeNode in="gass" />
        </feMerge>
      </filter>
    </defs>
    <path class="st2" d="M0 0 L32 0 L32 128 L0 128 Z" />
  </svg>
`;

export default class BarChart extends React.Component<IPropBarChartV2, any> {

  domContainer: Element = null;
  chart: any;

  componentDidMount() {
  

    const svgString = createSvg('#156dff', 8);
    const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

    const DOMURL: any = window.URL || window.webkitURL || window;
    const insetShadowUrl = DOMURL.createObjectURL(svg);
    const data = this.props.data;

    const option = {
      xAxis: {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(255,255,255, 0.5)',
          interval: 0
        },
        splitLine: {
          show: false,
        },
        data: data.xAxis,
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: 'rgba(255,255,255, 0.5)',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.1)',
            width: 2,
          },
        },
      },
      grid: {
        left: 30,
        top: 15,
        right: 0,
        bottom: 60,
      },
      series: [{
        data: data.yAxis,
        type: 'pictorialBar',
        symbol: 'image://' + insetShadowUrl,
        barWidth: 30,
      },
      {
        data: data.yAxis,
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          color: 'transparent',
          borderWidth: 3,
          borderColor: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
              offset: 0,
              color: '#156dff'
            },
            {
              offset: 1,
              color: '#00eaeb'
            }]
          ),
          shadowColor: 'blue',
          shadowBlur: 12,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      }],
    };
    if(this.domContainer) {
      this.chart = echarts.init(this.domContainer);
      this.chart.setOption(option);
    }
  }

  render() {
    return <div ref={domContainer => this.domContainer = domContainer} style={{ width: '100%', height: '100%' }} />
  }
}
