import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Timer({ setGame, game }) {
  const { timer, idInterval, idQuestion } = game;

  useEffect(() => {
    if (idInterval === null) {
      const interval = setInterval(() => {
        setGame((state) => ({ ...state, timer: state.timer - 1 }));
      }, 1000);
      setGame((state) => ({ ...state, idInterval: interval }));
    }
  }, [idQuestion]);

  return (
    <div>
      {timer}
    </div>
  );
}

Timer.propTypes = {
  setGame: PropTypes.func.isRequired,
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};
