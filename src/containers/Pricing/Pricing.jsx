import React, { useState } from 'react';
import PricingItems from './PricingItems';
import PricingWrapper, {
  PricingHeader,
  Title,
  Description,
  ButtonGroup,
  PricingTableArea,
  Button,
} from './Pricing.style';
// demo data
import { monthlyPlans, annuallyPlans } from './Pricing.data';

const Pricing = () => {
  const [currentPlan, setCurrentPlan] = useState('monthly');
  let plans = [];
  if (currentPlan === 'monthly') {
    plans = monthlyPlans;
  }
  if (currentPlan === 'annually') {
    plans = annuallyPlans;
  }

  return (
    <PricingWrapper>
      <PricingHeader>
        <Title>Faça parte do clube Higo</Title>
        <Description>
        Preços simples e transparentes para todos, seja você um hotel local
        proprietário ou um agente.
        </Description>
        <ButtonGroup>
          <Button
            onClick={() => setCurrentPlan('monthly')}
            className={currentPlan === 'monthly' ? 'active' : null}
          >
            Mensal
          </Button>

        </ButtonGroup>
      </PricingHeader>
      <PricingTableArea>
        <PricingItems plans={plans} />
      </PricingTableArea>
    </PricingWrapper>
  );
};

export default Pricing;
