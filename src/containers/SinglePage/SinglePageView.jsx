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
      content: [
        <>
        Escolha as datas da sua viagem: Após a compra, você receberá um e-mail com um link para preencher o formulário e sugerir 3 datas para sua viagem. Acesse também pela sua Conta HIGO.
        <br />
        Como escolher: Selecione 3 datas com pelo menos 5 dias de intervalo entre elas. A primeira data deve ser no mínimo 60 dias após o preenchimento do formulário (ou 60 dias após o vencimento do último boleto, se pagou no boleto parcelado). Exemplo: Se você preencher o formulário em 15/03, a primeira data possível será 14/05.
        <br />
        Alterações: Você pode alterar as datas sugeridas a qualquer momento na sua Conta HIGO. Lembre-se de que o prazo mínimo entre as alterações é de 60 dias. Atenção: Após a confirmação do voo, alterações só serão possíveis em casos excepcionais e poderão gerar custos adicionais.
        </>
      ]
    },    
    {
      title: "Confirmação da viagem",
      content: "Após o envio do formulário ao HIGO, você receberá a confirmação da sua solicitação e os ingressos para a utilização em até 7 dias antes da data escolhida. É importante ressaltar que, em caso de lotação do passeio na data selecionada ou indisponibilidade da atividade devido a restrições de dias da semana, entraremos em contato para oferecer novas opções de data ou, caso prefira, efetuaremos a devolução integral do valor pago."
    },
    {
      title: "Política de cancelamento e multas",
      content: [
        <>
          Precisando cancelar sua viagem? Acesse sua Conta HIGO e solicite o cancelamento do seu pacote. Quanto antes você cancelar, menor será a taxa cobrada.
          <br />
          Importante: As regras de reembolso variam de acordo com o momento do cancelamento. Consulte nossas políticas para mais detalhes sobre as multas que podem ser aplicadas.
        </>
      ]
    },
    {
      title: "Para sua comodidade",
      content: [
        <>
        Acesso fácil: Encontre a opção de cancelamento diretamente na sua Conta HIGO.
        <br />
        Clareza: Entenda as regras de reembolso de forma simples e objetiva.
        <br />
        Agilidade: Quanto mais cedo você cancelar, menores serão as possíveis taxas.
        <br />
        Lembre-se: Após a confirmação do voo, as regras de cancelamento podem mudar. Consulte nossas políticas para mais detalhes.

        </>
      ]
    },
    {
      title: "Taxas",
      content: [
        <>
        Taxas Adicionais: A taxa de serviço do HIGO é aplicada sobre o valor total do pacote no momento da compra. Demais taxas, como impostos locais, taxas de resort e outras, são de responsabilidade do cliente e devem ser pagas diretamente aos respectivos fornecedores ou órgãos públicos. O HIGO não se responsabiliza pelo cálculo, cobrança ou quitação dessas taxas adicionais.
        <br />
        Informação sobre Taxas: O HIGO disponibiliza as informações sobre taxas adicionais de que tem conhecimento para auxiliar o cliente na tomada de decisão. No entanto, a exatidão e atualização dessas informações não são garantidas, pois são fornecidas pelos próprios fornecedores ou autoridades.
        <br />
        Responsabilidade do Cliente: Ao adquirir um pacote, o cliente concorda em arcar com todas as taxas adicionais aplicáveis, conforme exigido pelos fornecedores ou autoridades competentes. É responsabilidade do cliente buscar informações atualizadas sobre essas taxas e efetuar os pagamentos diretamente aos responsáveis.
        <br />
        Isenção de Responsabilidade: O HIGO não se responsabiliza por quaisquer inconvenientes, prejuízos ou disputas relacionados a taxas adicionais, incluindo cobranças indevidas, alterações nas taxas ou divergências sobre sua aplicação. O cliente isenta o HIGO de qualquer responsabilidade financeira relacionada a essas taxas.
        </>
      ]
    },
    {
      title: "Formas de Pagamento",
      content: [
        <>
        Cartão de crédito:
        <br />
        Flexibilidade: Use até 2 cartões e parcele em até 12x.
        Praticidade: Ideal para quem prefere o pagamento parcelado.
        Clientes Apple Pay e Samsung Pay: Pagamento rápido e seguro.
        Importante: Pode haver cobrança de juros, sempre informada antes da compra.
        <br />
        <br />
        Boleto à vista:
        <br />

        Simples e seguro: Pagamento único, sem complicações.
        <br />
        Compensação rápida: Aprovação em até 3 dias úteis.
        <br />
        Atenção: Pagamento deve ser feito até a data de vencimento.
        <br />
        <br />
        Pix:
        <br />
        Agilidade: Pagamento instantâneo e aprovação em até 4 horas.
        <br />
        Praticidade: Utilize o QR Code ou código Pix para finalizar a compra.
        <br />
        Importante: Código válido por 20 minutos.
        <br />
        <br />
        HIGO Créditos:
        <br />

        Utilize seus créditos: Pague total ou parcialmente com seus HIGO Créditos.
        <br />
        Validade: Verifique a validade dos seus créditos antes de finalizar a compra.
        <br />
        <br />
        Boleto parcelado:
        <br />

        Sem consulta: Sem consulta ao SPC e Serasa.
        <br />
        Flexibilidade: Parcelamento de acordo com a oferta.
        <br />
        Importante: Pode haver cobrança de juros, sempre informada antes da compra.
        <br />
        Importante sobre o boleto parcelado:
        <br />
        Primeira parcela: Deve ser paga em até 7 dias após a compra. Caso contrário, o pedido será cancelado e o valor pago convertido em HIGO Créditos.
        <br />
        Atraso em 3 parcelas: O pacote será cancelado e o valor pago convertido em HIGO Créditos com validade de 1 ano.

        </>
      ]
    },
    {
      title: "Validade",
      content: "Planeje sua viagem: Seu pacote é válido de 01 de agosto a 30 de novembro de 2026, exceto em feriados e alta temporada (janeiro a julho e dezembro). Para garantir sua viagem, sugerimos datas dentro do período de validade. Caso precise ajustar as datas, basta acessar seu formulário de viagem. Após a data de validade, o pacote expira."
    },
    {
      title: "Viagens individuais ou em grupo",
      content: [
        <>
        Viagem individual: Viaje como preferir! Adicione 40% ao valor do pacote e informe no formulário.
        <br />
        Viagem em grupo: Reúna seus amigos e familiares! Compre pacotes iguais e informe os números dos pedidos no formulário. Faremos o possível para acomodar todos no mesmo voo e hotel.
        </>
      ]
    },
    {
      title: "Regras para crianças",
      content: "Crianças de até 2 anos incompletos não pagam passagem aérea em voos nacionais. Em voos internacionais, pagam 10% do valor da tarifa do adulto. "
    },
    {
      title: "Documentação para a viagem",
      content: [
        <>
Sua responsabilidade: É fundamental que você tenha todos os documentos necessários para a viagem. O HIGO não se responsabiliza por impedimentos de embarque causados pela falta de documentação.
<br />
Documentação comum:
<br />
<br />
Carteira de Identidade (RG) ou Carteira Nacional de Habilitação (CNH): Válida e com foto.
<br />
Certidão de Nascimento: Para crianças menores de 12 anos. A partir dessa idade, é necessário apresentar1 o RG ou outro documento oficial com foto.
        </>
      ]
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
