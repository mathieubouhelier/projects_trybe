import React from 'react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
// import pokemons from '../data';

describe('Click next button must display next pokemon', () => {
  test('Click next button must display next pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNext = getByText(/Próximo pokémon/);
    expect(buttonNext.type).toBe('button');
    expect(buttonNext).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Charmander');
  });
  test('Arriving to the last pokemon Click next button must display first pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonNext = getByText(/Próximo pokémon/);
    expect(buttonNext).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    fireEvent.click(buttonNext);
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Caterpie');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Ekans');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Alakazam');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Mew');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Rapidash');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Snorlax');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Dragonair');
    fireEvent.click(buttonNext);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('Pokedex must show only one pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  // To be refracted with mock and to forEach
  test('Pokedex must contain button filter', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allButton = document.querySelectorAll('button');
    const buttonNext = getByText(/Próximo pokémon/);
    const pokemonType = screen.getByTestId('pokemonType');
    fireEvent.click(allButton[1]);
    fireEvent.click(buttonNext);
    expect(pokemonType).toHaveTextContent(allButton[1].innerHTML);
  });

  test('Encountered pokémons must be on the page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Pokedex must pass all pokemons after click button All', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allButton = document.querySelectorAll('button');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonTypeButton = screen.queryAllByTestId('pokemon-type-button');
    fireEvent.click(allButton[3]);
    fireEvent.click(allButton[0]);
    expect(pokemonType).toHaveTextContent('Electric');
    expect(getByText('All')).toBeInTheDocument();
    expect(pokemonTypeButton.length).toBe(7);
  });

  test('If only one pokemon button next disable', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allButton = document.querySelectorAll('button');
    const buttonNext = getByText(/Próximo pokémon/);
    fireEvent.click(allButton[1]);
    expect(buttonNext.disabled).toBeTruthy();
  });
});
