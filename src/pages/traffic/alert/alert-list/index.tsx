import React from 'react';
import { Pagination } from 'antd';

import './style.scss';

interface IPropAlert {
  alertList: any[];
  filter?: any;
}

const AlertList = (props: IPropAlert) => {
  const alertList = props.alertList;
  return <div className="alert-list">
    <div style={{ color: '#fff' }}>共 {alertList.length} 条告警</div>
    {
      alertList.map((item, index) => <div key={`alert-item-${index}`} className="alert-item border-box">
        <div>{item.title}</div>
        <div>告警时间： {item.time} </div>
        <div>告警类型： {item.type} </div>
        <div>告警等级： {item.level} </div>
      </div>)
    }
    <div style={{ marginTop: '12px' }}>
      <Pagination total={20} pageSize={4} size="small" style={{ float: 'right' }}></Pagination>
    </div>
  </div>
}

export default AlertList;
