import React, { useState, useEffect } from 'react';

import LineChart from '../../../components/line-chart';
import CountDown from '../../../components/count-down';
import './style.scss';
import { message } from 'antd';
import moment from 'moment';

interface IPropIntersectionFlow {
  title: string;
  intersectionFlow: number;
  key?: number | string;
  target: {
    id: number;
    name: string;
    position: [number, number];
    flow_count: number;
    place: string;
    date_time: any;
  }
}

const IntersectionItem = (props: IPropIntersectionFlow) => {
  const title = props.title;
  const intersectionFlow = props.intersectionFlow;
  const target = props.target;
  const [flowData, setFlowData] = useState([]);
  useEffect(() => {
    fetch(`/jam/intersection_flow?id=${target.id}&date=${moment().format('YYYY-MM-DD')}`).then(res => res.json())
      .then(res => {
        const { result, message, data } = res;
        if(result) {
          setFlowData(data);
        } else {
          message.error(message);
        }
      })
      .catch(err => message.error(message));
  }, [])
  return <div className="intersection-item">
  <div className="intersection-title"> {title} </div>
  <div className="intersection-body">
    <div style={{width: '25%', height: '100%', float: 'left', position: 'relative' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', fontWeight: 600, textAlign: 'center' }}>路口流量</div>
        <div style={{ color: '#fff', fontSize: '28px', fontWeight: 600, textAlign: 'center' }}>
          <CountDown value={intersectionFlow} mapfn={parseInt} time={1000} />
        </div>
      </div>
    </div>
    <div style={{ width: '75%', height: '100%', float: 'left', borderLeft: '1px solid rgb(86, 147, 164)', paddingLeft: '10px' }}>
      <div style={{ width: '100%', height: '20px', fontSize: '14px', lineHeight: '20px', color: '#fff', paddingLeft: '15px' }}>路口流量变化趋势</div>
      <div style={{ width: '100%', height: '180px' }}>
        <LineChart style={{ width: '100%', height: '100%' }} data={{
          x: flowData.map(item => item.time).map(time => {
            console.log(new Date(time).valueOf());
            return moment(new Date(time).valueOf()).format('HH:mm')
          }),
          y: flowData.map(item => item.flow),
        }} />
      </div>
    </div>
  </div>
</div>
}

export default IntersectionItem;
