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

// Importando ícones do Material-UI
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FlightIcon from '@mui/icons-material/Flight';
import HomeIcon from '@mui/icons-material/Home';

const SinglePage = () => {
  let { slug } = useParams();
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
  } = data[0];

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

            <Row gutter={30}>
              <Col xl={12}>
                <img 
                  src={image.url}
                  alt="Imagem à esquerda" 
                  style={{ width: '100%', height: '70%' }}
                  onClick={() => handleImageClick(image.url)}
                />
              </Col>
              <Col xl={12} style={{ display: 'flex', flexDirection: 'column' }}>
                {gallery.map((img, index) => (
                  <img 
                    key={index}
                    src={img.url}
                    alt={`Imagem da galeria ${index + 1}`} 
                    style={{ width: '100%', height: index === 0 ? '35%' : '33%', marginBottom: 15 }}
                    onClick={() => handleImageClick(img.url)}
                  />
                ))}
              </Col>
            </Row>

            <div style={{ marginTop: '-150px' }}>
              <h2><strong>O que tem no pacote de viagem?</strong></h2>
              <Row gutter={30}>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalCafeIcon style={{ marginRight: '10px' }} />
                    <div><strong>Café da manhã</strong></div>
                  </div>
                  <p style={{color: '#808080', marginLeft: '9%' }}>Inclui café da manhã na hospedagem.</p>
                </Col>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FlightIcon style={{ marginRight: '10px' }} />
                    <div><strong>Passagem aérea econômica</strong></div>
                  </div>
                  <p style={{color: '#808080', marginLeft: '9%' }}>Passagens aéreas de ida e volta em classe econômica.</p>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <HomeIcon style={{ marginRight: '10px' }} />
                    <div><strong>Hospedagem econômica</strong></div>
                  </div>
                  <p style={{color: '#808080', marginLeft: '9%'}}>Com quarto duplo ou triplo.</p>
                </Col>
              </Row>
            </div>

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
    </SinglePageWrapper>
  );
};

export default SinglePage;
