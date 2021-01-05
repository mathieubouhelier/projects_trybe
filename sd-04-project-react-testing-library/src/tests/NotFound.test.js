import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('correct image information must be display', () => {
  const { getAllByRole } = render(<NotFound />);
  const images = getAllByRole('img');
  let flag = false;
  images.map((image) => {
    if (image.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif') {
      flag = true;
    }
    return flag;
  });
  expect(flag).toBeTruthy();
});

test('correct h2 must be display', () => {
  const { getByRole } = render(<NotFound />);
  const h2 = getByRole('heading');
  expect(h2.innerHTML).toBe(
    'Page requested not found<span role="img" aria-label="Crying emoji"> 😭 </span>',
  );
});
