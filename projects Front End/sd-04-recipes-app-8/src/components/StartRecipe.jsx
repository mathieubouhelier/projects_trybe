import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeBtnStart } from '../actions/index';

import './StartRecipe.css';

const StartRecipe = ({ btnStart, currentLocation }) => {
  const dispatch = useDispatch();

  const title = btnStart === false ? 'Iniciar Receita' : 'Continuar Receita';

  const id = window.location.pathname.slice(9);

  const initialPath = currentLocation === '/comidas' ? '/comidas' : '/bebidas';

  return (
    <Link to={`${initialPath}/${id}/in-progress`}>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-start-recipe btn btn-info"
        onClick={() => dispatch(changeBtnStart())}
      >
        {title}
      </button>
    </Link>
  );
};

const mapStateToProps = (state) => ({
  btnStart: state.startRecipe.startRecipe,
  currentLocation: state.updateLocation.currentLocation,
});

StartRecipe.propTypes = {
  btnStart: PropTypes.bool.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(StartRecipe);
