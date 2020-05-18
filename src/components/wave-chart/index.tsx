import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-liquidfill';

// import autoFix from 'utils/autoFix'

export default class WaveChart extends Component<any, any> {
  chart: any = null;
  chartDom: Element = null;

  constructor (props) {
	  super(props);
  }

componentDidMount() {
	this.chart = echarts.init(this.chartDom);
	window.addEventListener('resize', () => {
		this.chart.resize();
	})
	if(this.chart) {
	  var arr = this.props.value;
	  var max = 500;
	  var data = max * arr;
	  const option = {
		  title: {
			  top: '40%',
			  left: 'center',
			  text: Math.round(arr * 100) + '%',
			  textStyle: {
				  color: '#fff',
				  fontStyle: 'normal',
				  fontWeight: 'normal',
				  fontSize: 24,
			  },
			},
		  series: [{
				  type: 'liquidFill',
				  itemStyle: {
					  normal: {
						  opacity: 0.4,
						  shadowBlur: 0,
						  color: "#3B7BF8",
							shadowColor: '#3B7BF8'
						}
				  },
				  color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						  offset: 0,
						  color: "#4A87FF"
					  },
					  {
						  offset: 1,
						  color: '#3B7BF8'
					  }
				  ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						  offset: 0,
						  color: "#4A87FF"
					  },
					  {
						  offset: 1,
						  color: '#3B7BF8'
					  }
				  ]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						  offset: 0,
						  color: "#4A87FF"
					  },
					  {
						  offset: 1,
						  color: '#3B7BF8'
					  }
				  ])],
				  // name: arr[3],
				  data: [{
					  value: this.props.value,
					  itemStyle: {
						  normal: {
							  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0,
									  color: "#4A87FF"
								  },
								  {
									  offset: 1,
									  color: '#3B7BF8'
								  }
							  ]),
								opacity: 1,
						  }
					  }
				  }],
				  // background: '#000',
					center: ['50%', '50%'],
				  backgroundStyle: {
					  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							  offset: 0,
							  color: "#3A63E8"
						  },
						  {
							  offset: 1,
							  color: '#3213AB'
						  }
					  ]),
				  },
				  label: {
					  normal: {
						  formatter: '',
						  textStyle: {
							  fontSize: 12
						  }
					  }
				  },
				  outline: {	
					  itemStyle: {
						  borderColor: '#4344E6',
						  borderWidth: 5
					  },
					  borderDistance: 0
				  }
			  }
		  ]
	  }
		this.chart.setOption(option)
	}
}

  render() {
	return <div className="wave-chart" style={{ width: 'auto', height: 'auto', position: 'relative' }}>
		<div {...this.props} ref={chartDom => this.chartDom = chartDom} />
		<div className="text" style={{ position: 'absolute', top: '54%', left: '50%', transform: 'translateX(-50%)' }}>饱和度</div>
	</div>
	}
}
