import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

import './RecipeCards.css';

const RecipeDetails = ({ recipe, currentLocation }) => {
  const recipeType = currentLocation === '/comidas' ? 'Meal' : 'Drink';
  const category = currentLocation === '/comidas' ? 'Category' : 'Alcoholic';

  return (
    <div>
      <ShareButton
        type={currentLocation.slice(1)}
        idInput={Object.values(recipe[0])[0]}
      />
      <FavoriteButton recipe={recipe} recipeType={recipeType} />
      {recipe.map((item) => (
        <div key={item[`id${recipeType}`]}>
          <div>
            <img
              data-testid="recipe-photo"
              src={item[`str${recipeType}Thumb`]}
              alt={`${recipeType} Card`}
              className="recipe-photo"
            />
            <h1 data-testid="recipe-title">{item[`str${recipeType}`]}</h1>
            <h4 data-testid="recipe-category">{item[`str${category}`]}</h4>
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.DetailReducer.id,
  currentLocation: state.updateLocation.currentLocation,
});

RecipeDetails.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(RecipeDetails);
