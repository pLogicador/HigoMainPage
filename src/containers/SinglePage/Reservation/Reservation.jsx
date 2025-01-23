import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/UI/Card/Card';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import RenderReservationForm from './RenderReservationForm';
import { useParams } from 'react-router-dom'; // Para capturar o slug da URL

// CardHeader recebe o preço como prop
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
  price, // Recebendo o valor do preço como prop
}) => {
  return (
    <Fragment>
      <Heading
        content={
          <Fragment>
            R${price} <Text as="span" content="" {...pricePeriodStyle} />
          </Fragment>
        }
        {...priceStyle}
      />
    </Fragment>
  );
};

// Aqui você vai buscar o pacote com o preço baseado no slug
export default function Reservation() {
  const { slug } = useParams(); // Pegando o slug da URL
  const [packageData, setPackageData] = useState(null); // Para armazenar o pacote encontrado
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento

  useEffect(() => {
    // Função para carregar o JSON local com os pacotes
    const loadPackages = () => {
      // Simulação de JSON local (substitua com o arquivo real)
      const allPackages = [
        { slug: 'morro-de-sao-paulo', price: '1.290' },
        { slug: 'fortaleza', price: '1.465' },
        { slug: 'rio-de-janeiro', price: '879' },
        { slug: 'Gramado', price: '2.182' },
        { slug: 'porto-seguro-viagem', price: '1.179' },
        { slug: 'florianopolis', price: '1.294' },
        { slug: 'natal', price: '1.490' },
        { slug: 'maceio', price: '1.679' },
        { slug: 'cancun', price: '4.165' },
        { slug: 'bariloche', price: '4.469' },
        { slug: 'buenos-aires', price: '2.449' },
        { slug: 'Hotel-La-Plage', price: '167' },
        { slug: 'Marinas-Maceio-Hotel', price: '167' },
        { slug: 'Haka-Maori-Jericoacoara', price: '216' },
        { slug: 'Marinas-Maceio-Hotel', price: '216' },
        { slug: 'Marina-Park-Hotel', price: '342' },
        { slug: 'Sun-Bay-Pipa-Hotéis', price: '165' },
      ];

      // Busca o pacote pelo slug
      const foundPackage = allPackages.find((pkg) => pkg.slug === slug);

      setPackageData(foundPackage); // Atualiza o estado com o pacote encontrado
      setLoading(false); // Finaliza o estado de carregamento
    };

    loadPackages(); // Chama a função para carregar os pacotes

  }, [slug]); // Executa novamente sempre que o slug mudar

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem enquanto os dados estão carregando
  }

  if (!packageData) {
    return <div>Pacote não encontrado</div>; // Exibe mensagem caso o pacote não seja encontrado
  }

  return (
    <Card
      className="reservation_sidebar"
      header={<CardHeader price={packageData.price} />} // Passando o preço do pacote encontrado
      content={<RenderReservationForm />}
      footer={
        <p>
          {/* Ofertas especiais disponíveis. <TextLink to="/#1" content="Ver detalhes" /> */}
        </p>
      }
    />
  );
}

CardHeader.propTypes = {
  priceStyle: PropTypes.object,
  pricePeriodStyle: PropTypes.object,
  linkStyle: PropTypes.object,
  price: PropTypes.string.isRequired, // O preço é obrigatório
};
