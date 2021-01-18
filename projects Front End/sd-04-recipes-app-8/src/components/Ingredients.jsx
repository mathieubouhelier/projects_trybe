import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import objIngredients from '../services/listIngredients';

const Ingredients = ({ recipe }) =>
  Object.entries(objIngredients(recipe)).map((item, index) => (
    <p
      data-testid={`${index}-ingredient-name-and-measure`}
    >{`${item[0]} ${item[1]}`}</p>
  ));

const mapStateToProps = (state) => ({
  recipe: state.DetailReducer.id,
});

Ingredients.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(Ingredients);
