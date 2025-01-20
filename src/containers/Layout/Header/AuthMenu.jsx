import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constant';

const menuItems = [
  {
    key: 'menu-1',
  },
  {
    key: 'menu-2',
  },
];

const AuthMenu = ({ className }) => {
  return <Menu className={className} items={menuItems} />;
};

export default AuthMenu;
