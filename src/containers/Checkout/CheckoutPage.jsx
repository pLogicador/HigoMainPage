<<<<<<< HEAD
=======
// CheckoutPage.jsx
>>>>>>> 4a75dac (refactor: fix button logic and update layout)
import React from 'react';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
<<<<<<< HEAD
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
=======
  const { selectedPlan } = location.state || {};
  
  //console.log('Dados recebidos no checkout:', location.state);
  console.log('Dados recebidos no checkout:', selectedPlan);

  return (
    /*
    <CheckoutWrapper>
      <ContentWrapper>
    */
    <div>
        <Image src="/images/checkout.png" alt="Checkout" />
        <Heading as="h2" content="Finalize sua compra" />


        {/* Exibir as informações do plano selecionado */}
        {selectedPlan ? (
          <div>
            <p><strong>Plano Selecionado:</strong> {selectedPlan.title}</p>
            <p><strong>Preço:</strong> {selectedPlan.price}</p>
            <p><strong>Tipo:</strong> {selectedPlan.type}</p>
            <p><strong>Características:</strong> {selectedPlan.features.join(", ")}</p>
          </div>
        ) : (
          <p>Nenhum plano selecionado.</p>
        )}


        <p>Revise os detalhes do seu pedido antes de prosseguir com o pagamento.</p>
        <TextLink link="/payment" content="Ir para pagamento" />
    </div>
    /*
      </ContentWrapper> 
    </CheckoutWrapper> 
    */
>>>>>>> 4a75dac (refactor: fix button logic and update layout)
  );
};


export default CheckoutPage;
