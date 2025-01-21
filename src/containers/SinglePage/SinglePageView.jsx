import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button } from 'antd';
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

const SinglePage = () => {
  let { slug } = useParams();
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para a imagem selecionada
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
    image, // A imagem principal
  } = data[0];

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);  // Define a imagem selecionada
    setIsModalShowing(true);      // Abre o modal
  };

  const handleCancel = () => {
    setIsModalShowing(false); // Fecha o modal
    setSelectedImage(null);    // Limpa a imagem selecionada
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
            
            {/* Layout das imagens - imagem 1 à esquerda e 2 e 3 empilhadas à direita */}
            <Row gutter={30}>
              <Col xl={12}>
                <img 
                  src={image.url} // Usando a URL da imagem principal do JSON
                  alt="Imagem à esquerda" 
                  style={{ width: '100%', height: '70%' }}
                  onClick={() => handleImageClick(image.url)}  // Evento de clique
                />
              </Col>
              <Col xl={12} style={{ display: 'flex', flexDirection: 'column' }}>
                {gallery.map((img, index) => (
                  <img 
                    key={index}
                    src={img.url} // Usando as imagens da galeria
                    alt={`Imagem da galeria ${index + 1}`} 
                    style={{ width: '100%', height: index === 0 ? '35%' : '33%', marginBottom: 15 }}
                    onClick={() => handleImageClick(img.url)}  // Evento de clique
                  />
                ))}
              </Col>
            </Row>
            
            <Amenities amenities={amenities} />
            <Location location={data[0]} />
          </Col>
          
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={999}
                activeClass="isSticky"
                top={202}
                bottomBoundary="#reviewSection"
              >
                <Reservation />
              </Sticky>
            ) : (
              <BottomReservation
                title={title}
                price={price}
                rating={rating}
                ratingCount={ratingCount}
              />
            )}
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

      {/* Modal para exibir a imagem maior */}
      <Modal
        visible={isModalShowing}
        onCancel={handleCancel}
        footer={null}
        centered
        width="80%"  // Ajuste o tamanho do Modal
      >
        <img 
          src={selectedImage} 
          alt="Imagem expandida" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </Modal>
    </SinglePageWrapper>
  );
};

export default SinglePage;
