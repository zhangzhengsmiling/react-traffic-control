import React, { useState, useEffect } from 'react';

import AlertList from './alert-list';
import DropSelect from '../../../components/drop-select';

interface IPropAlert {
  alertList: any[];
}

const Alert = (props: any) => {
  const [filterOption, setFilterOption] = useState({level: 'all', type: 'all'});
  const allAlertList = props.alertList;
  const [alertList, setAlertList] = useState(allAlertList);
  return <div style={{ width: '100%', height: '100%', background: 'rgb(9, 21, 42)' }}>
  <div style={{ width: '100%', height: '32px' }}>
    <div style={{ width: '170px', height: 'auto', display: 'inline-block' }}>
      <DropSelect menu={[
          {key: 'all', value: '所有告警等级'},
          { key: '紧急', value: '紧急' },
          { key: '严重', value: '严重' },
          { key: '一般', value: '一般' },
          { key: '轻微', value: '轻微' },
        ]}
        placeholder="请选择告警等级"
        onChange={(key) => {
          console.log(key)
          setFilterOption(prev => ({
            ...prev,
            level: key,
          }))
        }}
      />
    </div>
    <div style={{ width: '170px', height: 'auto', marginLeft: '20px', display: 'inline-block' }}>
      <DropSelect
        menu={[
          {key: 'all', value: '所有告警类型'},
          { key: '交通事故', value: '交通事故' },
          { key: '交通拥堵', value: '交通拥堵' },
          { key: '设备故障', value: '设备故障' },
          { key: '天气异常', value: '天气异常' },
        ]}
        placeholder="请选择告警类型"
        onChange={(key) => {
          // if(key === 'all') return setAlertList(testAlertList)
          setFilterOption(prev => ({
            ...prev,
            type: key,
          }))
        }}
      />
    </div>
  </div>
  <div style={{ color: '#fff', width: '100%', height: '2px', background: 'rgba(114, 130, 213, 0.4)', margin: '16px 0' }}></div>
  <div style={{ width: '100%', height: '712px' }}>
    <AlertList
      alertList={
        allAlertList
        .filter(item => filterOption.level === 'all' ? true : item.level === filterOption.level)
        .filter(item => filterOption.type === 'all' ? true : item.type === filterOption.type)
      }
      filter={{
        level: '',
        type: '',
      }}
    />
  </div>
</div>
}

export default Alert;
