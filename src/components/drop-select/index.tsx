import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import _ from 'lodash';

import Iconfont from '../../components/iconfont';

import './style.scss';

// const { Button } = Dropdown;
const DEFALT_PLACEHOLDER = '请选择';

interface IPropsDropSelect {
  placeholder?: string;
  menu: {key: string | number, value: string | number, icon: any}[],
  onChange?: (key: string | number, target: any) => any;
  filterOption?: any;
}

const DropSelect = (props: IPropsDropSelect) => {
  const menu = props.menu;
  const placeholder = props.placeholder || DEFALT_PLACEHOLDER;
  // const initSelect = menu.find(item => item.key === )
  // const initSelect = menu.find(item => item.key === props.filterOption);
  const [select, setSekect] = useState(undefined);
  const handleMenuClick = (e) => {
    const key = e.key;
    const value = menu.find(item => item.key == key);
    setSekect(prev => value);
  }
  useEffect(() => {
    if(_.isFunction(props.onChange) && select) {
      props.onChange(select.key, select);
    }
  }, [select]);
  const levelMenu = <Menu onClick={handleMenuClick}>
      {
        menu.map((item) => 
          <Menu.Item key={item.key}>
            {
              item.icon ? item.icon : ''
            }
            {item.value}
          </Menu.Item>
        )
      }
    </Menu>
  return <Dropdown overlayClassName="drop-select" overlay={levelMenu}>
  <Button
    className="button drop-select-button"
  >
    <span className="btn-text">
      { (select && select.value) || placeholder }
    </span>
    <CaretDownOutlined />
  </Button>
</Dropdown>
}

export default DropSelect;
