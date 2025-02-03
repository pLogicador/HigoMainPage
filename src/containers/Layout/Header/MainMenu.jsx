import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';  // Importando o ícone de usuário
import { LOGIN_PAGE } from '../../../settings/constant'

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constant';

const menuItems = [
  {
    label: <NavLink to={HOME_PAGE}>Pacotes</NavLink>,
    key: 'menu-1',
  },
  {
    label: <NavLink to={LISTING_POSTS_PAGE}>Hoteis</NavLink>,
    key: 'menu-2',
  },
  // {
  //   // label: <NavLink to={AGENT_PROFILE_PAGE}>Passeios</NavLink>,
  //   key: 'menu-4',
  // },
  {
    label: <NavLink to={PRICING_PLAN_PAGE}>Clube</NavLink>,
    key: 'menu-3',
  },
  {
    label: (
      <NavLink to={LOGIN_PAGE}>
        <UserOutlined />
        <span style={{ marginLeft: '8px' }}>Login</span>
      </NavLink>
    ),
    key: 'menu-4',
  },
];

const MainMenu = ({ className }) => {
  return <Menu className={className} items={menuItems} />;
};

export default MainMenu;
