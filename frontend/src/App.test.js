import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it('should renders without crashing', () => {
  mount(
    <App />
  );
});
