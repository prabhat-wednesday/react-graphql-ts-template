import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import SongDetailsContainer from '..';

describe('<SongDetailsContainer test', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongDetailsContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
