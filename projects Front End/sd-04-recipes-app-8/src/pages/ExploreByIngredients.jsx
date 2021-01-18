import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

import FetchIngredientsAPI from '../actions/ingredientsActions';
import { changeLocation } from '../actions/index';
import FetchThemealAPI, { fetchByIngredient } from '../actions/themealdb';

const ExploreByIngredient = ({
  isFetchingIngredients,
  ingredients,
  isFetchByIngredient,
  isFetchingRecipes,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeLocation(window.location.pathname.slice(9, 17)));
    dispatch(FetchIngredientsAPI());
  }, []);

  const pageType =
    window.location.pathname.slice(9, 17) === '/comidas'
      ? 'themeal'
      : 'thecocktail';

  const ingredientType =
    window.location.pathname.slice(9, 17) === '/comidas'
      ? 'Ingredient'
      : 'Ingredient1';

  const handleClick = (event, ingredient) => {
    event.preventDefault();
    dispatch(fetchByIngredient());
    dispatch(
      FetchThemealAPI({
        searchOption: 'ingredient',
        searchedValue: ingredient,
      }),
    );
  };

  const renderIngredientCards = (arrIngredients) => {
    return (
      <div className="container">
        {arrIngredients.slice(0, 12).map((item, index) => (
        <div class="row justify-content-center m-3">
          <div class="card text-center" style={{ width: '18rem' }}>
          <Link
            to={window.location.pathname.slice(9, 17)}
            onClick={(event) => handleClick(event, item[`str${ingredientType}`])}
          >
            <div data-testid={`${index}-ingredient-card`}>
              <img
                data-testid={`${index}-card-img`}
                src={`https://www.${pageType}db.com/images/ingredients/${
                  item[`str${ingredientType}`]
                  }-Small.png`}
                alt="Ingredient Card"
              />
              <p data-testid={`${index}-card-name`}>
                {item[`str${ingredientType}`]}
              </p>
            </div>
          </Link>
      </div>
      </div>
        ))
        }
      </div>

    )
  };

  if (isFetchByIngredient && !isFetchingRecipes) {
    return <Redirect to={window.location.pathname.slice(9, 17)} />;
  }

  return (
    <div>
      <ExploreHeader title={'Explorar Ingredientes'} />
      {isFetchingIngredients && 'Loading...'}
      {ingredients.length > 0 && renderIngredientCards(ingredients)}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetchingIngredients: state.IngredientsReducer.isFetchingIngredients,
  ingredients: state.IngredientsReducer.ingredients,
  isFetchByIngredient: state.ThemealDB.isFetchByIngredient,
  isFetchingRecipes: state.ThemealDB.isFetching,
});

ExploreByIngredient.propTypes = {
  isFetchingIngredients: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetchByIngredient: PropTypes.bool.isRequired,
  isFetchingRecipes: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(ExploreByIngredient);
