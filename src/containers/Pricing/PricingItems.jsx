import React from 'react';
import { useNavigate } from 'react-router-dom';
import PriceCard from 'components/PriceCard/PriceCard';
import { CHECKOUT_PAGE } from 'settings/constant';

export default function PricingItems({ plans }) {
  const navigate = useNavigate();

  const handleCheckout = (plan) => {
    console.log('Plano selecionado:', plan);
    navigate(CHECKOUT_PAGE, { state: { selectedPlan: plan } });
    console.log('Navegação para Checkout ocorreu');
  };

  return plans.map((plan) => (
    <PriceCard
      className="price_card"
      data={plan}
      key={plan.title}
      buttonText={'Selecionar plano'}
      onClick={() => handleCheckout(plan)}
    />
  ));
}
