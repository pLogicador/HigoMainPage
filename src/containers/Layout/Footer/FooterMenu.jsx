import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRIVACY_PAGE,
  PRICING_PLAN_PAGE,
  AGENT_PROFILE_PAGE,
} from 'settings/constant';

const navigations = [
  {
    label: <NavLink to={`${HOME_PAGE}`}>Menu</NavLink>,
    key: 'hotels',
  },
  {
    label: <NavLink to={`${LISTING_POSTS_PAGE}`}>Hoteis</NavLink>,
    key: 'listing',
  },
  {
    label: <NavLink to={`${PRICING_PLAN_PAGE}`}>Planos</NavLink>,
    key: 'pricing',
  },
  {
    label: <NavLink to={`${PRIVACY_PAGE}`}>Termo de Privacidade</NavLink>,
    key: 'privacy',
  },
  
];

const FooterMenu = () => {
  return <Menu items={navigations} />;
};

export default FooterMenu;
