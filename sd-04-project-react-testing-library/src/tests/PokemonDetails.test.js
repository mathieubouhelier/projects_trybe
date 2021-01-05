import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { logDOM } from '@testing-library/react';
import pokemons from './mockPokemonDetail';
// import pokemon from './mockPokemon';
// import { Link } from 'react-router-dom';
// import pokemons from '../data';

test('renders a reading with the text `pikachu Details`', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  // logDOM();

  expect(getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
});

test('There must be no link to this pokemon detail page', () => {
  const { getAllByRole } = renderWithRouter(<App pokemons={pokemons} />);
  const linkHomePage = getAllByRole('link');
  fireEvent.click(linkHomePage[3]);
  const linksdetailpage = getAllByRole('link');
  linksdetailpage.map((link) =>
    expect(link.href).not.toBe('http://localhost/pokemons/25'),
  );
});

test('renders a h2 with the text `pikachu Details`', () => {
  const { getAllByRole, getByText, history } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  console.log('test history 1', history.location.pathname);
  console.log(history.location.pathname);
  fireEvent.click(detailLink[3]);
  const element = getByText(/Summary/i);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
  console.log('test history 2', history.location.pathname);
});

test('renders a h2 with the text Game Locations of <name>', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const element = getByText(`Game Locations of ${pokemons[0].name}`);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
});

test('must render all location', () => {
  const { getAllByRole } = renderWithRouter(<App pokemons={pokemons} />);
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const images = getAllByRole('img');
  let count = 0;
  images.map((image) => {
    if (image.alt === `${pokemons[0].name} location`) {
      count += 1;
      expect(image.src).toBe(pokemons[0].foundAt[count - 1].map);
      expect(image.alt).toBe(`${pokemons[0].name} location`);
    }
    return count;
  });
  expect(count).toBe(pokemons[0].foundAt.length);
});

test('renders the text `Pokémon favoritado?', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const element = getByText('Pokémon favoritado?');
  expect(element).toBeInTheDocument();
});

test('renders the text the summary', () => {
  const { getAllByRole, getByText } = renderWithRouter(
    <App pokemons={pokemons} />,
  );
  const detailLink = getAllByRole('link');
  fireEvent.click(detailLink[3]);
  const summary = getByText(pokemons[0].summary);
  expect(summary).toBeInTheDocument();
});
