import React from 'react';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  console.log('Dados recebidos no checkout:', location.state);

  return (
    <CheckoutWrapper>
      <ContentWrapper>
        <Image src="/images/checkout.png" alt="Checkout" />
        <Heading as="h2" content="Finalize sua compra" />
        <p>Revise os detalhes do seu pedido antes de prosseguir com o pagamento.</p>
        <TextLink link="/payment" content="Ir para pagamento" />
      </ContentWrapper>
    </CheckoutWrapper>
  );
};


export default CheckoutPage;
