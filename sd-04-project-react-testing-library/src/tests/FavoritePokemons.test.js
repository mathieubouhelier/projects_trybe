import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('No favorite pokemon found must be display', () => {
  const { getByText } = render(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
