import React from 'react';
import { createHashHistory } from 'history'

import './style.scss';

interface INavItem {
  key: string;
  title: string;
  icon: React.ReactElement;
  path: string;
}

interface IPropNav {
  onNavChange?: (INavItem) => any;
  navs: INavItem[];
  navKey: string;
}

const history = createHashHistory();

const Nav = (props: IPropNav) => {
  const navs: INavItem[] = props.navs;
  return <div className="nav">
    {
      navs.map(item => <div
        key={item.key}
        onClick={() => {
          props.onNavChange(item);
          history.push(item.path);
        }}
        className={`item${item.key === props.navKey ? ' active' : ''}`}
      >
        <div className="icon"> {item.icon} </div>
        <div className="text"> {item.title} </div>
      </div>)
    }
  </div>
}

export default Nav;
