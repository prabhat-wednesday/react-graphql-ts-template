import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { AppTest as App } from '@containers/App';
import { BrowserRouter } from 'react-router-dom';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', async () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
