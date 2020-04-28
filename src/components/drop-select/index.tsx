import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import _ from 'lodash';

import './style.scss';

// const { Button } = Dropdown;
const DEFALT_PLACEHOLDER = '请选择';

interface IPropsDropSelect {
  placeholder?: string;
  menu: {key: string | number, value: string | number}[],
  onChange?: (key: string, target: any) => any;
}

const DropSelect = (props: IPropsDropSelect) => {
  const menu = props.menu;
  const placeholder = props.placeholder || DEFALT_PLACEHOLDER;
  const [select, setSetlect] = useState(undefined);
  const handleMenuClick = (e) => {
    const key = e.key;
    const value = menu.find(item => item.key === key);
    setSetlect(prev => value);
  }
  useEffect(() => {
    if(_.isFunction(props.onChange) && select) {
      props.onChange(select.key, select);
    }
  }, [select]);
  const levelMenu = <Menu onClick={handleMenuClick}>
      {
        menu.map((item) => 
          <Menu.Item key={item.key}> {item.value} </Menu.Item>
        )
      }
    </Menu>
  return <Dropdown overlayClassName="drop-select" overlay={levelMenu}>
  <Button
    className="button"
    style={{ background: 'rgb(22, 55, 101)', border: '2px solid rgb(43, 142, 232)', color: '#fff', lineHeight: '10px', width: '100%' }}>
    <span className="btn-text">
      { (select && select.value) || placeholder }
    </span>
    <CaretDownOutlined />
  </Button>
</Dropdown>
}

export default DropSelect;
