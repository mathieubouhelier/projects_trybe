import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Feedback() {
  const {
    player: { score, assertions },
  } = useSelector((state) => state.login);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div data-testid="feedback-text">
        {assertions < 3 && <p>Podia ser melhor...</p>}
        {assertions >= 3 && <p>Mandou bem!</p>}
      </div>
      <div>
        <p>Final Score:</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p>Total correct answers:</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
      <Link to="/" data-testid="btn-play-again">
        <input value="Login" id="Login" type="button" />
      </Link>
      <Link to="/Ranking" data-testid="btn-ranking">
        <input value="Ranking" id="Ranking" type="button" />
      </Link>
    </div>
  );
}
