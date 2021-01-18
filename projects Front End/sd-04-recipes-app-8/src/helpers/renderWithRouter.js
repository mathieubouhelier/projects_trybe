import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

export default function renderWithRouter(component, routeConfigs = {}) {
  const route = routeConfigs.route || '/';
  const history =
    routeConfigs.history || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
}

// Mokando toda a lib
// jest.mock('react-router-dom', () => {
//   Pegando a implementação original da lib.
//   const moduloOriginal = jest.requireActual('react-router-dom');
//    Atualizando o BrowserRouter com o moduloOriginal
//   return {
//     ...moduloOriginal,
//     BrowserRouter: ({ children }) => <div>{children}</div>,
//   };
// });
