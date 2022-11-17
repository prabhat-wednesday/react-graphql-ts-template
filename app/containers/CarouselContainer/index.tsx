import React from 'react';
import { Card, Carousel } from 'antd';
import styled from 'styled-components';
import { Song } from '../ItunesContainer/types';

interface CarouselContainerProps {
  db: {
    recommendedSongs: Song[];
  };
}

const StyledCarousel = styled(Carousel)`
  &&& .slick-list {
    width: 50%;
    margin: 1rem auto;
  }

  &&& .slick-track {
    height: 100%;
  }

  &&& .ant-carousel .slick-dots {
    background: black;
    display: block;
    position: absolute;
    bottom: 3rem;
    left: 25rem;
  }
`;

const CarouselContainer = ({ db }: CarouselContainerProps) => {
  const { recommendedSongs } = db;
  return (
    <StyledCarousel autoplay>
      {recommendedSongs.map((item: any) => (
        <Card key={item.artworkUrl100} cover={<img src={item.artworkUrl100} style={{ height: '100%' }} />} />
      ))}
    </StyledCarousel>
  );
};

export default CarouselContainer;
