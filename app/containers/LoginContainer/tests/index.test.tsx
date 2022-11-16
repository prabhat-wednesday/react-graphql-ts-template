import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import LoginContainer from '..';

describe('<LoginContainer tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<LoginContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
