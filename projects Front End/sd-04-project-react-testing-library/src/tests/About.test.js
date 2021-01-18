import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

test('renders a reading at least the text `Pokédex`', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const heading = queryAllByText(/Pokédex/i);
  expect(heading).not.toBeNull();
});

test('the page must contain one heading h2 with the text `About Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const element = getByText(/About Pokédex/i);
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
});

test('the page must contain two paragraph with the text `Pokédex`', () => {
  const { queryAllByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const element = queryAllByText(/Pokédex/i);
  expect(element).toHaveLength(2);
});

test('the page must contain one image of `Pokédex`', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const alt = getByAltText(/Pokédex/i);
  expect(alt).toBeInTheDocument();
  expect(alt.getAttribute('src')).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
