import React from 'react';
import { Pagination } from 'antd';
import Empty from '../../../../components/empty';

import './style.scss';
import { levelColorMap, levelMap } from '../constants/index';

interface IPropAlert {
  alertList: any[];
  filter?: any;
}

const AlertList = (props: IPropAlert) => {
  const alertList = props.alertList;
  const total = alertList.length;
  return total ? <div className="alert-list">
  <div style={{ color: '#fff' }}>共 <span style={{ color: 'rgb(51, 175, 199)', fontWeight: 800 }}>{total}</span> 条告警</div>
  {
    alertList.map((item, index) => <div key={`alert-item-${index}`} className="alert-item border-box">
      <div style={{ fontSize: '16px', marginBottom: '8px' }}>{item.title}</div>
      <div>告警时间： {item.time} </div>
      <div>告警类型： {item.type} </div>
      <div>告警等级： <div style={{  width: '8px', height: '8px', borderRadius: '50%', background: levelColorMap.get(item.level), display: 'inline-block', margin: '0 5px' }}></div> {levelMap.get(item.level)} </div>
    </div>)
  }
  <div className="alert-list-pagination">
    <Pagination total={props.alertList.length} pageSize={4} size="small" />
  </div>
</div> : <Empty />
}

export default AlertList;
