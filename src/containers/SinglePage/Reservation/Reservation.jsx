import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/UI/Card/Card';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import RenderReservationForm from './RenderReservationForm';

const CardHeader = ({
  priceStyle = {
    color: '#2C2C2C',
    fontSize: '25px',
    fontWeight: '700',
  },
  pricePeriodStyle = {
    fontSize: '15px',
    fontWeight: '400',
  },
  linkStyle = {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
}) => {
  return (
    <Fragment>
      <Heading
        content={
          <Fragment>
            R$162 <Text as="span" content="/ Noite" {...pricePeriodStyle} />
          </Fragment>
        }
        {...priceStyle}
      />
      <TextLink link="/#1" content="Contato do Hotel" {...linkStyle} />
    </Fragment>
  );
};

export default function Reservation() {
  return (
    <Card
      className="reservation_sidebar"
      header={<CardHeader />}
      content={<RenderReservationForm />}
      footer={
        <p>
          Ofertas especiais disponíveis. <TextLink to="/#1" content="Ver detalhes" />
        </p>
      }
    />
  );
}

CardHeader.propTypes = {
  priceStyle: PropTypes.object,
  pricePeriodStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};
