import React, { ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { AnyAction, compose } from '@reduxjs/toolkit';
import { selectSongListError, selectLoading, selectSongData } from './selector';
import { requestGetSongList } from './reducer';
import ituneCallSaga from './saga';
import { ItuneContainerProps } from './types';
import ItuneSongList from '@app/components/ItuneSongList';
import styled from 'styled-components';
import { Input, Pagination, PaginationProps } from 'antd';
import { media } from '@app/themes';
import { ErrorHandler, T } from '@app/components';
import { useHistory, useLocation } from 'react-router-dom';

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

const ItunesContainer = ({ dispatchArtistName, songData, loading, songListError }: ItuneContainerProps) => {
  const [paginationParams, setPaginationParams] = useState({ pageNumber: 1, pageSize: 10 });
  const history = useHistory();
  const location = useLocation();
  const artistName = location.pathname.slice(1);
  console.log(artistName, location);
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
      dispatchArtistName({ artistName, pageNumber, pageSize });
    }
  }, [artistName, pageNumber, pageSize]);

  const handleOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const artistName = e.target.value;
    if (artistName.trim()) {
      history.push(`/${artistName}`);
      dispatchArtistName({ artistName });
    }
  }, 500);

  return (
    <div>
      <InputContainer>
        <T data-testid="search-label" id="song_search_default" />
        <CustomInput
          data-testid="search-bar"
          aria-label="input-element"
          onChange={(e) => handleOnChange(e)}
          type="text"
        />
      </InputContainer>
      <ItuneSongList loading={loading} songData={songData} />
      <ErrorHandler loading={loading} launchListError={songListError} />
      <Pagination onChange={handlePaginationOnChange} defaultCurrent={1} total={50} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  songData: selectSongData(),
  songListError: selectSongListError()
});

export function mapDispatchToProps(dispatch: (arg0: AnyAction) => void) {
  return {
    dispatchArtistName: (payload: string) => dispatch(requestGetSongList(payload))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'ituneComponent', saga: ituneCallSaga }))(ItunesContainer);

export const ItunesContainerTest = ItunesContainer;
