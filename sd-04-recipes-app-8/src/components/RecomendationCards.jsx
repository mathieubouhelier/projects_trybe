import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './RecipeCards.css';

const RecomendationCards = ({ recomendation, currentLocation }) => {
  const [counter, setCounter] = useState(1);
  const recomendationType = currentLocation === '/comidas' ? 'Drink' : 'Meal';

  return (
    <div className="recomendationContainer">
      <button className="btn btn-info mt-2" disabled={counter === 1} onClick={() => setCounter(counter - 1)} >{'<'}</button>
      {recomendation.slice(0, 6).map((recipe, index) => (
        <div
          key={recipe[`id${recomendationType}`]}
          style={{ display: (counter === index || counter === index + 1) ? '' : 'none' }}
          className="reconedationCard"
        >
          <img
            data-testid={`${index}-recomendation-card`}
            src={recipe[`str${recomendationType}Thumb`]}
            alt={`${recomendationType} Card`}
            className="recipe-photo"
          />
          <h3 data-testid={`${index}-recomendation-title`}>
            {recipe[`str${recomendationType}`]}
          </h3>
        </div>
      ))
      }
      <button className="btn btn-info mt-2" disabled={counter === 5} onClick={() => setCounter(counter + 1)}>{'>'}</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recomendation: state.DetailReducer.recomendation,
  currentLocation: state.updateLocation.currentLocation,
});

RecomendationCards.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(RecomendationCards);
