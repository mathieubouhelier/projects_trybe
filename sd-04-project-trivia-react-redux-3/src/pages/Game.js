import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlayer } from '../actions/login';
import Header from '../components/Header';
import Timer from '../components/Timer';
import QuestionDisplay2 from '../components/QuestionDisplay2';

const difficulty = { hard: 3, medium: 2, easy: 1 };

const getScore = (timer, questions) => (10 + (timer * difficulty[questions.difficulty]));

const validateAnswer = ({ timer, selectedAnswer }, questions, dispatch) => {
  if ((selectedAnswer) && selectedAnswer === questions.correct_answer) {
    dispatch(updatePlayer(getScore(timer, questions)));
  }
};

const covertRanking = ({ name, score, gravatarEmail }) => ({ name, score, gravatarEmail });

const handleNext = (setGame, { idQuestion, idInterval }, player, history) => {
  setGame((state) => ({ ...state, selectedAnswer: '' }));
  setGame((state) => ({ ...state, timer: 30 }));
  if (idQuestion === 4) {
    clearInterval(idInterval);
    if (localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([...JSON.parse(localStorage.getItem('ranking')), covertRanking(player)]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([covertRanking(player)]));
    }
    history.push('/Feedback');
  }
  setGame((state) => ({ ...state, idQuestion: state.idQuestion + 1 }));
};

function Game({ history }) {
  const [game, setGame] = useState({
    timer: 30,
    idInterval: null,
    idQuestion: 0,
    selectedAnswer: '',
    currentQuestion: [],
  });
  const { trivia: { results: questions } } = useSelector((state) => state.trivia);
  const { player } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { timer, idInterval, idQuestion, selectedAnswer } = game;

  const handleAnswer = () => {
    clearInterval(idInterval);
    setGame((state) => ({ ...state, idInterval: null }));
  };

  useEffect(() => {
    if (timer === 0) {
      handleAnswer();
    }
  }, [timer]);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify({ player }));
  }, [player]);

  useEffect(() => {
    validateAnswer(game, questions[idQuestion], dispatch);
  }, [selectedAnswer]);

  return (questions.length > 0) ? (
    <div>
      <Header />
      <Timer setGame={setGame} game={game} />
      <QuestionDisplay2
        setGame={setGame} handleAnswer={handleAnswer} game={game} questions={questions}
      />
      {(selectedAnswer || (timer === 0)) &&
        <button data-testid="btn-next" onClick={() => handleNext(setGame, game, player, history)}>
          next
        </button>
      }
    </div>
  ) : (
    <div>
      loading...
    </div>
  );
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Game);
