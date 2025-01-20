import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import Footers from 'components/Footer/Footer';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <Footers
      logo={
        <Logo
          withLink
          linkTo="/"
          src="/images/logotipo_2.svg"
          // title="Higo Viagens."
        />
      }
      menu={<FooterMenu />}
      copyright={`Copyright @ ${new Date().getFullYear()} Higo Viagens.`}
    />
  );
};

export default Footer;
