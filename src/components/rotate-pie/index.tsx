import React from 'react';
import echarts from 'echarts';

export default class RotatePie extends React.Component<any> {

  domContainer: Element = null;
  chart: any = null;
  timer: any = null;

  _pie1 = () => {
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          normal: {
            color: "rgba(88,142,197,0.4)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)"
          }
        }
      })
    }
    return dataArr
  }

  _pie2() {
    let dataArr = [];
    let _color = {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0, color: '#9933FF' // 0% 处的颜色
      }, {
          offset: 1, color: '#00CCFF' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
    for (var i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 50,
          itemStyle: {
            normal: {
              //color: "rgba(88,142,197,0.5)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else if (i % 4 === 1) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 2,
          itemStyle: {
            normal: {
              color: "rgba(88,142,197,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else if (i % 4 === 2) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 20,
          itemStyle: {
            normal: {
              //color: "rgba(88,142,197,0.2)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 2,
          itemStyle: {
            normal: {
              //color: "rgba(0,0,0,0)",
              color: "rgba(88,142,197,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      }
    }
    return dataArr
  }

  _pie3() {
    let dataArr = [];
    for (var i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 25,
          itemStyle: {
            normal: {
              color: "rgb(126,190,255)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 20,
          itemStyle: {
            normal: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      }

    }
    return dataArr
  }

  _pieData(data) {
    let _data = data;
    let dataArr = [];
    for (var i = 0; i < 5; i++) {
      if (i === 2) {
        let dt = (data[0].unit) ? 25 : (Number(data[0].value));
        dataArr.push({
          name: (i + 1).toString(),
          value: dt,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: 'rgb(147,187,216)'
              }, {
                offset: 1,
                color: '#588ec5'
              }]),
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0.4)"
            }
          }
        })
      } else {
        let dta = (data[0].unit) ? 25 : (1 - Number(data[0].value)) / 4;
        dataArr.push({
          name: (i + 1).toString(),
          value: dta,
          itemStyle: {
            normal: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      }
    }
    //console.log(dataArr)
    return dataArr
  }

  componentDidMount() {
    const colors = this.props.colors || ['red', 'green', 'yellow', 'orange'];
    const _this = this;
    const option = {
      series: [{
        type: 'pie',
        zlevel: 1,
        silent: true,
        radius: ['97%', '98%'],
        hoverAnimation: false,
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#9933FF' // 0% 处的颜色
            }, {
                offset: 1, color: '#00CCFF' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        label: {
          normal: {
            show: false
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: this._pie1(),
      },
      {
        type: 'pie',
        zlevel: 2,
        silent: true,
        radius: ['90%', '91%'],
        startAngle: 90,
        hoverAnimation: false,
        // color: ['red'],
        // color: [],
        label: {
          normal: {
            show: false
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#9933FF' // 0% 处的颜色
            }, {
                offset: 1, color: '#00CCFF' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        data: this._pie2()
      },
      {
        type: 'pie',
        zlevel: 3,
        silent: true,
        radius: ['83%', '84%'],
        label: {
          normal: {
            show: false
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: this._pie3()
      }, 
      {
        type: 'pie',
        zlevel: 4,
        silent: true,
        radius: ['70%', '80%'],
        // color: ["#fc8d89", "#46d3f3", "rgba(203,203,203,0.9)", 'rgb(100, 100, 100)'],
        color: colors,
        startAngle: 50,
        hoverAnimation: false,
        label: {
          normal: {
            show: false
          },
        },
        data: [1, 1, 1, 1]
      }]
    };

    function doing() {
      // console.log(_this.chart)
      let option = _this.chart.getOption();
      option.series[1].startAngle = option.series[1].startAngle - 1;
      //option.series[2].startAngle = option.series[2].startAngle - 1;
      //option.series[6].data[0].value = option.series[6].data[0].value + 1;
      _this.chart.setOption(option);
  
    }
  
    function startTimer() {
        this.timer = setInterval(doing, 100);
    }
    
    function stopTimer() {
      clearInterval(this.timer);
    }

    if(this.domContainer) {
      this.chart = echarts.init(this.domContainer);
      this.chart.setOption(option);
      this.timer = setInterval(doing, 120);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <div style={{ width: '100%', height: '300px', marginTop: '20px' }} ref={domContainer => this.domContainer = domContainer} />
  }
}
