import { AnyAction } from '@reduxjs/toolkit';

export interface Song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  previewUrl: string;
  trackPrice: number;
  primaryGenreName: string;
}

export interface SongData {
  results: Song[];
}

export interface RequestSongListActionPayload {
  artistName: string;
  pageNumber: number;
  pageSize: number;
}
export type SongActionCreator = (payload: any) => AnyAction;

export interface ItuneContainerProps {
  dispatchSongList: SongActionCreator;
  songData: {
    results: Song[];
  };
  loading: boolean;
  songListError?: string;
}
