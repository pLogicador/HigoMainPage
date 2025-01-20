import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthContext } from 'context/AuthProvider';
import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRICING_PLAN_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
} from 'settings/constant';

const MobileMenu = ({ className }) => {
  // auth context
  const { loggedIn, logOut } = useContext(AuthContext);

  const navigations = [
    {
      label: <NavLink to={HOME_PAGE}>Hoteis</NavLink>,
      key: 'hotels',
    },
    {
      label: <NavLink to={`${LISTING_POSTS_PAGE}`}>Pacotes</NavLink>,
      key: 'listing',
    },
    {
      label: <NavLink to={`${PRICING_PLAN_PAGE}`}>Planos</NavLink>,
      key: 'pricing',
    },
    {
      label: loggedIn && (
        <NavLink to={`${AGENT_ACCOUNT_SETTINGS_PAGE}`}>
          Configurações
        </NavLink>
      ),
      key: 'account_settings',
    },
    {
      label: loggedIn && <button onClick={logOut}>Sair</button>,
      key: 'logout',
    },
  ];

  return <Menu className={className} items={navigations} />;
};

export default MobileMenu;
