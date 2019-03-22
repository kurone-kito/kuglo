import Enzyme from 'enzyme';
import React from 'react';
import App from '~/app/App';

describe('<App />', () => {
  beforeEach(() => {
    Enzyme.shallow(<App />);
  });
  it('No crashes', () => {});
});
