import { takeLatest, call, put } from 'redux-saga/effects';
import { requestGetSongList, successGetSongList, failureGetSongList } from '../SongProviderContainer/reducer';
import { getItune } from '@services/apiUtils';
import { Song } from './types';

function increaseResolution(value: any) {
  let data = value;
  data = {
    ...value,
    results: value.results?.map((item: Song) => ({
      ...item,
      artworkUrl100: item?.artworkUrl100?.replaceAll('100', '400')
    }))
  };
  return data;
}

export function* fetchDataFromItune(action: any): Generator<any, any> {
  const { artistName, pageNumber, pageSize } = action.payload ?? { artistName: '', pageNumber: 0, pageSize: 0 };
  const res: any = yield call(getItune, { artistName, pageNumber, pageSize });
  const { data, ok, error } = res;
  if (ok) {
    const convertedData = increaseResolution(data);
    yield put(successGetSongList(convertedData));
  } else {
    console.log(error);
    yield put(failureGetSongList(error));
  }
}

function* ituneCallSaga() {
  yield takeLatest(requestGetSongList.toString(), fetchDataFromItune);
}

export default ituneCallSaga;
