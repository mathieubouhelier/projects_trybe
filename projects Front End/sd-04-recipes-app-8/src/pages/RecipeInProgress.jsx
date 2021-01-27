import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipeDetails from '../components/RecipeDetails';

import objIngredients from '../services/listIngredients';
import FetchDetailIdAPI from '../actions/detailActionsId';
import { changeLocation } from '../actions/index';

const RecipeInProgress = ({ recipe, recipeID }) => {
  // const [isDisabled, enableBtn] = useState(true);
  // const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeLocation(window.location.pathname.slice(0, 8)));
    if (recipe.length === 0) {
      dispatch(
        FetchDetailIdAPI({
          searchOption: 'idRecipe',
          searchedValue: recipeID,
        }),
      );
    }
  }, []);

  const ingredientsList = () =>
    Object.entries(objIngredients(recipe)).map((item, index) => (
      <div data-testid={`${index}-ingredient-step`} className="form-check">
        <input
          className="form-check-input"
          // data-testid={`${index}-ingredient-step`}
          type="checkbox"
          name={`${item[0]} - ${item[1]}`}
        // checked={checked}
        // onChange={() => setChecked(!checked)}
        />
        {`${item[0]} - ${item[1]}`}

        <label
          className="form-check-label"
          htmlFor={`${item[0]} - ${item[1]}`}
          key={`${item[0]} - ${item[1]}`}
        >

        </label>
      </div>
    ));

  return (
    <div className="container">
      {recipe.length > 0 && <RecipeDetails />}
      {recipe.length > 0 && ingredientsList()}
      <Link to="/receitas-feitas">
        <button className="btn btn-info" type="button" data-testid="finish-recipe-btn" >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  },
) => ({
  recipe: state.DetailReducer.id,
  recipeID: id,
});

RecipeInProgress.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeID: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(RecipeInProgress);
