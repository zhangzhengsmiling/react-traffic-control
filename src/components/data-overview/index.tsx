import React from 'react';

import './style.scss'

interface IPropDataOverview {
  overview?: { label: React.ReactElement | string, value: React.ReactElement | string }[];
  defaultOverview?: { label: React.ReactElement | string, value: React.ReactElement | string }[];
  className?: string;
  style?: Object;
}

const defaultOverview = [
  { label: '---', value: '---' },
  { label: '---', value: '---' },
  { label: '---', value: '---' },
]

const DataOverview = (props: IPropDataOverview) => {
  const classname = props.className ? `${props.className} data-overview` : 'data-overview';
  const overview = props.overview || props.defaultOverview || defaultOverview;
  return <div {...props} className={classname}>
    {
      overview.map(item => <div className="item">
      <div className="label"> {item.label} </div>
      <div className="value"> {item.value} </div>
    </div>)
    }
  </div>
}

export default DataOverview;
