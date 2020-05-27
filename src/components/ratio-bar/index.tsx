import React from 'react';
import echarts from 'echarts';

export default class RatioBar extends React.Component<any> {

  domContainer: Element = null;
  chart: any = null;

  componentDidMount() {
    var cost = [this.props.ratio * 100 || 0]//本期比上期（大于1按1处理）
    var dataCost = [10.01]//真是的金额
    var totalCost = [100]//比例综合
    var visits = [24]//本期占总的百分比*100
    var grade = ['停车场饱和度' ]
    var myColor = ['rgb(89, 151, 167)'];
    var data = {
        grade: grade,
        cost: cost,
        totalCost: totalCost,
        visits: visits,
        dataCost:dataCost
    };
    const option = {
      // backgroundColor: '#05274C',
      // title: {
      //   top: '2%',
      //   left: 'center',
      //   text: '民用月隐患统计',
      //   textStyle: {
      //     align: 'center',
      //     color: '#4DCEF8',
      //     fontSize: 18
      //   }
      // },
      grid: {
        left: '130',
        right: '20'
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          margin:30,
          show: true,
          color: '#4DCEF8',
          fontSize: 14
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: data.grade
      },
      series: [{
        type: 'bar',
        barGap: '-65%',
        // label: {
        //   normal: {
        //     show: true,
        //     position: 'right',
        //     color: '#fff',
        //     fontSize: 14,
        //     formatter: 
        //     function(param) {
        //         return data.visits[param.dataIndex] +'%';
        //     },
        //   }
        // },
        barWidth: '30%',
        itemStyle: {
          normal: {
            borderColor: '#4DCEF8',
            borderWidth: 2,
            barBorderRadius: 15,
            color: 'rgba(102, 102, 102,0)'
          },
        },
        z: 1,
        data: data.totalCost,
      }, {
        type: 'bar',
        barGap: '-85%',
        barWidth: '21%',
        itemStyle: {
          normal: {
            barBorderRadius: 16,
            color: function(params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num]
            },
          }
        },
        max: 1,
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: (target) => {
              console.log()
              return Math.round(target.value) + '%';
            }
          }
        },
        labelLine: {
          show: true,
        },
        z: 2,
        data: data.cost,
      }]
    }
    if(this.domContainer) {
      this.chart = echarts.init(this.domContainer);
      this.chart.setOption(option);
    }
  }

  render() {
    return <div style={{ width: '100%', height: '40px' }} ref={domContainer => this.domContainer = domContainer} />
  }

}
