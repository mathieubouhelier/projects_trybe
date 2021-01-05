import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import Footer from '../components/Footer';

import { changeLocation } from '../actions/index';
import FetchThemealAPI from '../actions/themealdb';
import FetchAreaAPI from '../actions/areaActions';

const ExploreByArea = ({ isFetching, recipes, isFetchingArea, areas }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLocation(window.location.pathname.slice(9, 17)));
    dispatch(FetchThemealAPI({ searchedValue: '' }));
    dispatch(FetchAreaAPI());
  }, []);

  const handleSelect = (value) => (
    value === 'All'
      ? dispatch(FetchThemealAPI({ searchedValue: '' }))
      : dispatch(
          FetchThemealAPI({
            searchOption: 'area',
            searchedValue: value,
          }),
        )
  );

  const dropdownArea = (arrAreas) => (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={(event) => handleSelect(event.target.value)}
      >
        <option data-testid="All-option" defaultValue>All</option>
        {arrAreas.map((area) => (
          <option
            data-testid={`${area.strArea}-option`}
            key={area.strArea}
            value={area.strArea}
          >
            {area.strArea}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <Header title={'Explorar Origem'} />
      {isFetching && 'Loading...'}
      {!isFetchingArea && areas.length > 0 && dropdownArea(areas)}
      {!isFetching && recipes !== null && <RecipeCards />}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.ThemealDB.isFetching,
  recipes: state.ThemealDB.recipes,
  isFetchingArea: state.AreaReducer.isFetchingArea,
  areas: state.AreaReducer.areas,
});

ExploreByArea.propTypes = {
  // searchBarVisible: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetchingArea: PropTypes.bool.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(ExploreByArea);
