import React from 'react';
import { renderProvider, timeout } from '@app/utils/testUtils';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '..';
import { requestGetSongList } from '@app/containers/SongProviderContainer/reducer';
import { ItuneContainerProps } from '../types';
import { fireEvent } from '@testing-library/react';

describe('<ItuneContainer /> test', () => {
  let submitSpy: jest.Mock;
  let defaultProps: ItuneContainerProps;

  beforeEach(() => {
    submitSpy = jest.fn();
    defaultProps = {
      dispatchSongList: submitSpy,
      dispatchLogoutUser: submitSpy,
      loading: true,
      songData: {
        results: [
          {
            trackId: 1,
            artistName: 'Yung Xiety',
            artworkUrl100:
              'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
            collectionName: 'Arijit Singh (Mashup) - Single',
            previewUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/90/d6/0d/90d60d3b-2b95-8c84-f9aa-f69a2793d22c/mzaf_17815855687762407827.plus.aac.p.m4a',
            trackPrice: 123,
            primaryGenreName: 'Hindi Song'
          }
        ]
      }
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement, getByTestId } = renderProvider(<ItunesContainer {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
    expect(getByTestId('search-label')).toBeInTheDocument();
  });

  it('should validate the mapDispatchToProps action', () => {
    const dispatchSongListSpy = jest.fn();
    const payload = {
      artistName: 'Arijit Singh',
      pageNumber: 1,
      pageSize: 10
    };
    const action = {
      dispatchArtistName: requestGetSongList(payload)
    };
    const props = mapDispatchToProps(dispatchSongListSpy);
    props.dispatchSongList(payload);
    expect(dispatchSongListSpy).toHaveBeenCalledWith(action.dispatchArtistName);
  });

  it('should call the dispatchArtistName on change', async () => {
    const { getByTestId } = renderProvider(
      <ItunesContainer {...defaultProps} dispatchSongList={submitSpy} loading={false} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'Arijit Singh' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith({ artistName: 'Arijit Singh' });
  });
});
