import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import LocationWrapper from './Location.style';
// import Map from 'components/Map/Map';
import { Element } from 'react-scroll';

const Location = ({
  titleStyle = {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: '4px',
  },
  locationMetaStyle = {
    fontSize: '13px',
    fontWeight: '400',
    color: '#909090',
    mb: ['14px', '20px', '27px'],
  },
  contentStyle = {
    fontSize: '15px',
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: '1.6',
    mb: ['14px', '20px', '27px'],
  },
  boldContentStyle = {
    fontWeight: '700',
    mb: '0!important',
  },
  linkStyle = {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
  location,
}) => {
  const formattedAddress = location.formattedAddress;
  return (
    <Element name="location" className="location">
      <LocationWrapper>
        {/* <Heading as="h2" content="Localização" {...titleStyle} />
        <Text content={formattedAddress} {...locationMetaStyle} />
        <Text
          content="Faça uma caminhada fácil até os principais locais históricos da cidade. O
          bairro é perfeito para um sabor autêntico da vida romana, com
          lojas, galerias de arte, restaurantes, bares e clubes nas proximidades e
          pronto para ser descoberto."
          {...contentStyle}
        />
        <Text
          content="Distância do Aeroporto Internacional Leonardo da Vinci"
          {...contentStyle}
          {...boldContentStyle}
        />
        <Text content="26 minutos de carro sem trânsito" {...contentStyle} /> */}

        {/* <Map location={location} multiple={false} /> */}
      </LocationWrapper>
    </Element>
  );
};

Location.propTypes = {
  titleStyle: PropTypes.object,
  locationMetaStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default Location;
