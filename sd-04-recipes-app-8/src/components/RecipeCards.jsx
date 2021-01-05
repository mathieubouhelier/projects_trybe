import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './RecipeCards.css';

const RecipeCards = ({ recipes, currentLocation }) => {
  const recipeType = currentLocation === '/comidas' ? 'Meal' : 'Drink';

  const recipeID = (recipe, currLocation) => {
    let id;
    if (currLocation === '/comidas') id = recipe.idMeal;
    else id = recipe.idDrink;
    return id;
  };

  return (
    <div className="container">
      <div class="row justify-content-center mt-3">
      {recipes.slice(0, 12).map((recipe, index) => (
          <div class="card text-center card-custom mx-2 mb-3" style={{ width: '18rem' }}>
            <Link to={`${currentLocation}/${recipeID(recipe, currentLocation)}`}>
              <div key={recipe[`id${recipeType}`]} data-testid={`${index}-recipe-card`}>
                <img
                  data-testid={`${index}-card-img`}
                  src={recipe[`str${recipeType}Thumb`]}
                  alt={`${recipeType} Card`}
                  className="card-img-top"
                />
                <div class="card-body">
                  <h4 data-testid={`${index}-card-name`} className="card-title text-secondary">{recipe[`str${recipeType}`]}</h4>
                </div>
              </div>
            </Link>
          </div>
      ))}
      </div>
    </div>)
};

const mapStateToProps = (state) => ({
  recipes: state.ThemealDB.recipes,
  currentLocation: state.updateLocation.currentLocation,
});

RecipeCards.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(RecipeCards);
