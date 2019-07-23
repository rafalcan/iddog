import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import SignUp from "pages/SignUp";
import NotFound from "pages/NotFound";
import Routes from './Routes';
import { AuthProvider } from 'providers/Auth';

it('should renders without crashing', () => {
  mount(
    <AuthProvider>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    </AuthProvider>
  );
});

it('should show Home component for / router', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(component.find(SignUp)).toHaveLength(1);
});

it('should show Not Found component for route not defined', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/unknown']}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(component.find(NotFound)).toHaveLength(1);
});
