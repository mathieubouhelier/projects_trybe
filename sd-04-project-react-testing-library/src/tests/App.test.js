import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('link to home must have the href /', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home.href).toBe('http://localhost/');
});

test('link to about must have the href /about', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText(/about/i);
  expect(about.href).toBe('http://localhost/about');
});

test('link to favorites must have the href /favorites', () => {
  const { getByText } = renderWithRouter(<App />);
  const favorites = getByText(/Favorite Pokémons/i);
  expect(favorites.href).toBe('http://localhost/favorites');
});
