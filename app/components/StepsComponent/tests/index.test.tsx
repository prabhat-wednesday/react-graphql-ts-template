import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import StepsComponent from '..';

describe('<StepsComponent/> ', () => {
  const defaultProps = {
    currentIndex: 1,
    stepsMsg: [{ title: 'Username' }]
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<StepsComponent {...defaultProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
