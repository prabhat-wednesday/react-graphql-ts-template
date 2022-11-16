import React, { ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { AnyAction, compose } from '@reduxjs/toolkit';
import { selectLoading, selectSongData } from './selector';
import { requestGetSongList } from '../SongProviderContainer/reducer';
import ituneCallSaga from './saga';
import { ItuneContainerProps, RequestSongListActionPayload } from './types';
import ItuneSongList from '@app/components/ItuneSongList';
import styled from 'styled-components';
import { Input, Pagination, PaginationProps } from 'antd';
import { media } from '@app/themes';
import { If, T } from '@app/components';
import { useHistory } from 'react-router-dom';
import { setQueryParam } from '@app/utils';
import { isEmpty } from 'lodash-es';
import db from '../../db.json';
import CarouselContainer from '../CarouselContainer';
import { logoutUser } from '../LoginContainer/reducer';

const InputContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
  }
`;

const CustomInput = styled(Input)`
  && {
    width: 30%;
    display: block;

    ${media.lessThan('tablet')`
    width: 80%;`}
  }
`;

const CustomPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItunesContainer = ({ dispatchSongList, songData, loading, dispatchLogoutUser }: ItuneContainerProps) => {
  console.log(db);
  const { results } = songData;
  const [paginationParams, setPaginationParams] = useState({ pageNumber: 1, pageSize: 10 });
  const history = useHistory();
  const artistName = new URLSearchParams(history.location.search).get('artist_name');
  const setArtistName = (artistName: string) => setQueryParam({ param: 'artist_name', value: artistName });
  const { pageNumber, pageSize } = paginationParams;

  const handlePaginationOnChange: PaginationProps['onChange'] = (pageNumber: number, pageSize) => {
    if (pageNumber !== undefined) {
      setPaginationParams((prev) => ({ ...prev, pageNumber }));
    }
    if (pageSize !== undefined) {
      setPaginationParams((prev) => ({ ...prev, pageSize }));
    }
  };

  useEffect(() => {
    if (artistName !== undefined) {
      dispatchSongList({ artistName, pageNumber, pageSize });
    }
  }, [artistName, pageNumber, pageSize]);

  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const artistName = e.target.value;
    if (artistName.trim()) {
      setArtistName(artistName);
      dispatchSongList({ artistName });
    }
  }, 500);
  return (
    <div>
      <InputContainer>
        <button onClick={dispatchLogoutUser}>Logout</button>
        <T data-testid="search-label" id="song_search_default" />
        <CustomInput
          data-testid="search-bar"
          aria-label="input-element"
          onChange={(e) => handleOnChange(e)}
          type="text"
        />
      </InputContainer>
      <CarouselContainer db={db} />
      <ItuneSongList loading={loading} songData={songData} />
      <If condition={!isEmpty(results)}>
        <CustomPagination onChange={handlePaginationOnChange} defaultCurrent={1} total={50} />
      </If>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songData: selectSongData()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => any) {
  return {
    dispatchSongList: (payload: RequestSongListActionPayload) => dispatch(requestGetSongList(payload)),
    dispatchLogoutUser: () => dispatch(logoutUser())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);

export const ItunesContainerTest = ItunesContainer;
