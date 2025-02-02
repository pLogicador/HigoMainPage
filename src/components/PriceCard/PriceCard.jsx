import React from 'react';
import PriceCardWrapper, {
  Title,
  Price,
  PricingHeader,
  PricingList,
  PriceAction,
  Button,
} from './PriceCard.style';

<<<<<<< HEAD
export default function PriceCard({ className, data, buttonText }) {
=======
export default function PriceCard({ className, data, buttonText, onClick }) {
>>>>>>> 4a75dac (refactor: fix button logic and update layout)
  let price, pricingPlan;

  if (data.type === 'annually') {
    price = Math.ceil(data.price) * 12;
    pricingPlan = '/per year';
  } else {
    price = data.price;
    pricingPlan = '/por mês';
  }

  return (
    <PriceCardWrapper className={className}>
      <PricingHeader>
        <Title>{data.title}</Title>
        <Price>
          <strong>R${price} </strong>
          <span>{pricingPlan}</span>
        </Price>
      </PricingHeader>
      <PricingList>
        {data.features.map((feature) => (
          <li key={feature.title}>
            {feature.icon}
            <span>{feature.title}</span>
          </li>
        ))}
      </PricingList>
      <PriceAction>
<<<<<<< HEAD
        <Button>{buttonText}</Button>
=======
        <Button onClick={() => onClick(data)}>{buttonText}</Button>
>>>>>>> 4a75dac (refactor: fix button logic and update layout)
      </PriceAction>
    </PriceCardWrapper>
  );
}
