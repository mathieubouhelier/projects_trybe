import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import FetchThemealAPI from '../actions/themealdb';

const CategoryButtons = ({ categories }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const toggleFilter = (value) => {
    if (selectedCategory === value) {
      dispatch(FetchThemealAPI({ searchedValue: '' }));
      setSelectedCategory('');
    } else {
      dispatch(
        FetchThemealAPI({
          searchOption: 'category',
          searchedValue: value,
        }),
      );
    }
  };

  const handleClick = (value) => {
    setSelectedCategory(value);
    toggleFilter(value);
  };

  return (
    <div className="btn-group flex-wrap container-fluid mt-2 mb-1" role="group">
      <button
        className="btn btn-outline-info"
        data-testid="All-category-filter"
        type="button"
        onClick={() => dispatch(FetchThemealAPI({ searchedValue: '' }))}
      >
        All
      </button>
      {categories.slice(0, 5).map((item) => (
        <button
          className="btn btn-info"
          data-testid={`${item.strCategory}-category-filter`}
          key={item.strCategory}
          value={item.strCategory}
          type="button"
          onClick={(event) => handleClick(event.target.value)}
        >
          {item.strCategory}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.CategoriesReducer.categories,
});

CategoryButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(CategoryButtons);
