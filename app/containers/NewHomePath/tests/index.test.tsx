import React from 'react';
import { render } from '@testing-library/react';
import NewHomePath from '..';

describe('<NewHomePath /> test', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = render(<NewHomePath />);
    expect(baseElement).toMatchSnapshot();
  });
});
