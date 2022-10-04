import { createSlice } from '@reduxjs/toolkit';
import { Song } from './types';

export interface ApiResponseState {
  loading: boolean;
  dataToShow: Song[];
  error: null;
  searchTerm: string;
}

export const initialState: ApiResponseState = {
  loading: false,
  dataToShow: [],
  error: null,
  searchTerm: ''
};

const ituneSlice = createSlice({
  name: 'Itune',
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.dataToShow = [];
      state.error = null;
      state.loading = true;
    },
    getDataToShow: (state, action) => {
      state.dataToShow = action.payload;
      state.error = null;
      state.loading = false;
    },
    getErrorFromResponse: (state, action) => {
      state.dataToShow = [];
      state.searchTerm = '';
      state.loading = false;
      state.error = action.payload;
    },
    deleteResponse: (state) => {
      state.dataToShow = [];
      state.loading = false;
    }
  }
});

export const { getSearchTerm, getDataToShow, getErrorFromResponse, deleteResponse } = ituneSlice.actions;

export default ituneSlice.reducer;
