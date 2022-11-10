import React from 'react';
import ItuneSongList from '..';
import { SongData } from '@app/containers/ItunesContainer/types';
import { render, screen } from '@testing-library/react';

describe('<ItuneSongList/> ', () => {
  const songData: SongData = {
    results: [
      {
        trackId: 1,
        artistName: 'Yung Xiety',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/400x400bb.jpg',
        collectionName: 'Arijit Singh (Mashup) - Single',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/90/d6/0d/90d60d3b-2b95-8c84-f9aa-f69a2793d22c/mzaf_17815855687762407827.plus.aac.p.m4a',
        trackPrice: 1,
        primaryGenreName: 'Hindi Songs'
      }
    ]
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = render(<ItuneSongList loading={false} songData={songData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the list for the song when the data is available', () => {
    const {
      results: [{ artistName, artworkUrl100, collectionName }]
    } = songData;
    render(<ItuneSongList loading={false} songData={songData} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', artworkUrl100);
    expect(screen.getByText(artistName)).toBeVisible();
    expect(screen.getByText(collectionName)).toBeVisible();
  });

  it('should render the Skeleton Component when loading is true', async () => {
    const { baseElement } = render(<ItuneSongList songData={songData} loading={true} />);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
});
