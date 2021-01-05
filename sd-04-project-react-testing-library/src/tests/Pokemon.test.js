import React from 'react';
import Pokemon from '../components/Pokemon';
import pokemon from './mockPokemon';
import renderWithRouter from './renderWithRouter';

describe('Must return information of specific pokemon/', () => {
  test('correct name must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);
  });
  test('correct type must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(pokemon.type);
  });
  test('correct weight must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonName = getByTestId('pokemon-weight');
    expect(pokemonName).toHaveTextContent(
      `Average weight:${pokemon.averageWeight.value}${pokemon.averageWeight.measurementUnit}`,
    );
  });
});

test('correct image information must be display', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={false} />,
  );
  const image = getByRole('img');
  expect(image.src).toBe(pokemon.image);
  expect(image.alt).toBe(`${pokemon.name} sprite`);
});

test('check if  link to detail is correct', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={false} />,
  );
  const link = getByRole('link');
  expect(link.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
});

describe('If pokemon is favorite check if there is an star as icon', () => {
  test('If pokemon is favorite check if alt as a text pokemon name is marked as favorite`', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite />,
    );
    const images = getAllByRole('img');
    let flag = false;
    images.map((image) => {
      if (image.alt === `${pokemon.name} is marked as favorite`) flag = true;
      return flag;
    });
    expect(flag).toBeTruthy();
  });
  test('If pokemon is favorite check if src the correct link`', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite />,
    );
    const images = getAllByRole('img');
    let flag = false;
    images.map((image) => {
      if (image.src === 'http://localhost/star-icon.svg') flag = true;
      return flag;
    });
    expect(flag).toBeTruthy();
  });
});
