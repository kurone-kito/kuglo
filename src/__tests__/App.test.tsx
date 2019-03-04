import Enzyme from 'enzyme';
import React from 'react';

import App from '~/App';

describe('<App />', () => {
  beforeEach(() => {
    Enzyme.shallow(<App />);
  });
  it('No crashes', () => {});
});
