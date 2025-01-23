import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button, Card } from 'antd';
import Container from 'components/UI/Container/Container';
import Loader from 'components/Loader/Loader';
import useWindowSize from 'library/hooks/useWindowSize';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import Location from './Location/Location';
import Review from './Review/Review';
import Reservation from './Reservation/Reservation';
import BottomReservation from './Reservation/BottomReservation';
import SinglePageWrapper from './SinglePageView.style';
import useDataApi from 'library/hooks/useDataApi';
import isEmpty from 'lodash/isEmpty';
import { Container as BootstrapContainer, Collapse, Button as BootstrapButton } from 'react-bootstrap'; // Renomeando o Container do react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importando ícones do Material-UI
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FlightIcon from '@mui/icons-material/Flight';
import HomeIcon from '@mui/icons-material/Home';





const SinglePage = () => {
  
  const [open, setOpen] = useState(null); // Controla qual dropdown está aberto

  const toggleOpen = (index) => {
    setOpen(open === index ? null : index); // Alterna entre abrir e fechar
  };
  let { slug } = useParams();
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Estado para controle do card
  const { width } = useWindowSize();

  let url = `/data/${slug}.json`;

  const { data, loading } = useDataApi(url);
  if (isEmpty(data) || loading) return <Loader />;
  const {
    reviews,
    rating,
    ratingCount,
    price,
    title,
    gallery,
    location,
    content,
    amenities,
    author,
    image,
    infosAdicionais,
    detalhesDoPacote,
  } = data[0];

  
  const items = [
    {
      title: "Regulamento de Participação",
      content: "Aqui você encontra todos os detalhes sobre como participar do evento. Os requisitos incluem ..."
    },
    {
      title: "Regras de Inscrição",
      content: "Para se inscrever, você deve seguir os seguintes passos: primeiro ..."
    },
    {
      title: "Premiação",
      content: "Os vencedores terão direito a prêmios incríveis. A premiação será anunciada ..."
    },
    {
      title: "Fiz a compra, e agora?",
      content: "Após a compra, você receberá um e-mail com a confirmação e as próximas etapas. Caso não receba, entre em contato conosco."
    },
    {
      title: "Confirmação da viagem",
      content: "A confirmação da viagem será enviada por e-mail com todos os detalhes, incluindo horários e locais de encontro."
    },
    {
      title: "Política de cancelamento e multas",
      content: "O cancelamento pode ser feito até 7 dias antes da viagem sem custo. Após esse período, multas poderão ser aplicadas conforme os termos do contrato."
    },
    {
      title: "Taxas",
      content: "As taxas aplicáveis incluem impostos e encargos administrativos, que serão detalhados no momento da compra."
    },
    {
      title: "Formas de Pagamento",
      content: "Aceitamos cartões de crédito, débito, PIX e boleto bancário. Parcelamento disponível conforme condições da operadora."
    },
    {
      title: "Validade",
      content: "Os bilhetes possuem validade de acordo com a data da viagem escolhida. Não são transferíveis."
    },
    {
      title: "Viagens individuais ou em grupo",
      content: "Oferecemos opções para viagens individuais ou em grupo, com descontos para grupos acima de 10 pessoas."
    },
    {
      title: "Regras para crianças",
      content: "Crianças de até 2 anos viajam gratuitamente no colo. Acima dessa idade, é necessário adquirir uma passagem."
    },
    {
      title: "Documentação para a viagem",
      content: "Os documentos necessários incluem RG ou passaporte válido. Para menores de idade, consulte as regras específicas."
    }
  ];
  
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalShowing(true);
  };

  const handleCancel = () => {
    setIsModalShowing(false);
    setSelectedImage(null);
  };

  return (
    <SinglePageWrapper>
      <Container>
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
            <Description
              content={content}
              title={title}
              location={location}
            />

<Row gutter={10} style={{ margin: '0 -5px', marginBottom:'50%' }}>
  <Col
    xl={12}
    style={{
      marginBottom: 10, // Ajusta o espaçamento no mobile
    }}
  >
    <img
      src={image.url}
      alt="Imagem à esquerda"
      style={{
        width: '100%',
        height: '70%', // Ajusta altura dinamicamente
      }}
      onClick={() => handleImageClick(image.url)}
    />
  </Col>
  <Col
    xl={12}
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 10, // Ajusta o espaçamento no mobile
    }}
  >
    {gallery.map((img, index) => (
      <img
        key={index}
        src={img.url}
        alt={`Imagem da galeria ${index + 1}`}
        style={{
          width: '100%',
          height: '34.3%',
          marginBottom: 8, // Ajusta o espaçamento entre imagens
        }}
        onClick={() => handleImageClick(img.url)}
      />
    ))}
  </Col>
</Row>


            <div style={{ marginTop: '-455px' }}>
              <h2><strong>O que tem no pacote de viagem?</strong></h2>
              <Row gutter={30}>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalCafeIcon style={{ marginRight: '10px' }} />
                    <div><strong>Café da manhã</strong></div>
                  </div>
                  <p style={{ color: '#808080', marginLeft: '9%' }}>Inclui café da manhã na hospedagem.</p>
                </Col>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FlightIcon style={{ marginRight: '10px' }} />
                    <div><strong>Passagem aérea econômica</strong></div>
                  </div>
                  <p style={{ color: '#808080', marginLeft: '9%' }}>Passagens aéreas de ida e volta em classe econômica.</p>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <HomeIcon style={{ marginRight: '10px' }} />
                    <div><strong>Hospedagem econômica</strong></div>
                  </div>
                  <p style={{ color: '#808080', marginLeft: '9%' }}>Com quarto duplo ou triplo.</p>
                </Col>
              </Row>
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button
                  type="primary"
                  onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                >
                  {isDetailsVisible ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
                </Button>
              </div>
              {isDetailsVisible && (
                <Card style={{ marginTop: 20, width: '100%' }}>
                  <Container>
                    <h1><strong>Detalhes do Pacote.</strong></h1>

                    <p><strong>Aéreo:</strong> {detalhesDoPacote.aereo}</p>
                    <p><strong>Bagagem:</strong> {detalhesDoPacote.bagagem}</p>
                    <p><strong>Hospedagem:</strong> {detalhesDoPacote.hospedagem}</p>
                    <p><strong>Diárias:</strong> {detalhesDoPacote.diarias}</p>

                    <p><strong>Observações:</strong></p>
                    <ul>
                      {detalhesDoPacote.observacoes.map((observacao, index) => (
                        <li key={index}>{observacao}</li>
                      ))}
                    </ul>
                    
                    <p><strong>{detalhesDoPacote.atividadeDestino}</strong></p>
                  </Container>
                </Card>
              )}
            </div>

            <Amenities amenities={amenities} />
            <Location location={data[0]} />
          </Col>


        </Row>

        <Row gutter={30}>
          <Col xl={16}>
            <Review
              reviews={reviews}
              ratingCount={ratingCount}
              rating={rating}
            />
          </Col>
          <Col xl={8} />
        </Row>
      </Container>
      <Container>
  {width > 1200 ? (
    <Sticky
      innerZ={999}
      activeClass="isSticky"
      top={202}
      bottomBoundary="#reviewSection"
    >
      <div
        style={{
          position: 'fixed',
          top: '-902px', // Defina o valor conforme necessário
          right: '0',
          width: '100%', // Para garantir que ocupe a largura total
          maxWidth: '300px', // Para limitar a largura caso necessário
          padding: '10px',
          background: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Reservation />
      </div>
    </Sticky>
  ) : (
    <BottomReservation
      title={title}
      price={price}
      rating={rating}
      ratingCount={ratingCount}
    />
  )}
</Container>

      <Modal
        visible={isModalShowing}
        onCancel={handleCancel}
        footer={null}
        centered
        width="80%"
      >
        <img
          src={selectedImage}
          alt="Imagem expandida"
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>

      <Container>
        <div style={{width: '70%'}}>
  <h2><strong>{infosAdicionais.titulo}</strong></h2>
  <p>
    <h1><strong>{infosAdicionais.pacote.titulo}</strong></h1>
    <br />
    {infosAdicionais.pacote.descricao}
  </p>

  <h1><strong>{infosAdicionais.atracoes.titulo}</strong></h1>
  <p>
    {infosAdicionais.atracoes.descricao}
  </p>
  <ul>
    {infosAdicionais.atracoes.itens.map((item, index) => (
      <li key={index} style={{marginBottom: '2%'}}>
        <strong>· {item.titulo}:</strong> {item.descricao}
      </li>
    ))}
  </ul>

  <h1><strong>{infosAdicionais.hoteis.titulo}</strong></h1>
  <ul>
    {infosAdicionais.hoteis.itens.map((hotel, index) => (
      <li key={index} style={{marginBottom: '2%'}}>
        <strong>{hotel.nome}:</strong> {hotel.descricao}
      </li>
    ))}
  </ul>

  <p>{infosAdicionais.chamadaParaAcao}</p>

  <h1><strong>{infosAdicionais.informacoesImportantes.titulo}</strong></h1>
  <ul>
    {infosAdicionais.informacoesImportantes.itens.map((info, index) => (
      <li key={index} style={{marginBottom: '2%'}}>{info}</li>
    ))}
  </ul>
    </div>
</Container>

<Container>
  <div>
    <h1 style={{ marginTop: '10%', marginBottom: '5%' }}>
      <strong>Conheça nosso regulamento</strong>
    </h1>
  </div>

  {items.map((item, index) => (
    <div key={index}>
      <Button
        variant="link"
        onClick={() => toggleOpen(index)}
        aria-controls={`collapse-text-${index}`}
        aria-expanded={open === index ? "true" : "false"}
        style={{ width: '100%', textAlign: 'left', padding: 0 }}>
        <h5 style={{ margin: 0 }}>{item.title}</h5>
      </Button>
      <Collapse in={open === index}>
        <div id={`collapse-text-${index}`}>
          <p style={{ margin: 0, textAlign: 'left' }}>{item.content}</p>
        </div>
      </Collapse>
    </div>
  ))}
</Container>
    </SinglePageWrapper>
  );
};

export default SinglePage;
