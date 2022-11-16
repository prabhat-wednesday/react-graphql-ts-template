import React from 'react';
import { compose } from '@reduxjs/toolkit';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectSongData } from '../ItunesContainer/selector';
import { Song } from '../ItunesContainer/types';
import { Card } from 'antd';
import { get } from 'lodash-es';
import styled from 'styled-components';
import { media } from '@app/themes';
import { T } from '@app/components';

const { Meta } = Card;

interface SongDetailsProps {
  songData: {
    results: Song[];
  };
}

const CustomCard = styled(Card)`
  && .ant-card-cover {
    height: 100%;
  }
  && {
    padding: 5px;
    margin: 0.5rem;
    width: 30%;
    height: 15rem;
    display: flex;
    justify-content: space-between;
    ${media.lessThan('tablet')`
      width: 12rem;
      margin: 0.5rem;
    `}
  }
`;

const StyledImg = styled.img`
  && {
    height: 100%;
    object-fit: cover;
  }
`;

const StyledMeta = styled(Meta)`
  && {
    padding: 5px;
  }
`;

const StyledT = styled(T)`
  && {
    padding: 2px 2px 2px 5px;
    margin: 0;
  }
`;

const CustomSongDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SongDetails = ({ songData }: SongDetailsProps) => {
  const results = get(songData, 'results', []);
  const params = useParams<{ trackId?: string }>();
  const { trackId } = params;
  const singleSong = results?.find((result) => result.trackId === Number(trackId));
  const { artistName, collectionName, artworkUrl100, trackPrice, primaryGenreName } = singleSong ?? {};
  return (
    <CustomSongDetailsContainer>
      <Helmet>
        <title>Song Details</title>
        <meta name="description" content="Description of SongDetails" />
      </Helmet>
      <CustomCard
        hoverable
        cover={<StyledImg src={artworkUrl100?.replaceAll('100', '400')} loading="lazy" data-testid="cover-img" />}
      >
        <StyledMeta title={artistName} description={collectionName} />
        <StyledT text={`$ ${trackPrice?.toString()}`} />
        <StyledT text={primaryGenreName} />
      </CustomCard>
    </CustomSongDetailsContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  songData: selectSongData()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SongDetails);
