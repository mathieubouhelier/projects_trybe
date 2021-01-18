import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import Table from './Table';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchPlanet } from '../actions/planetActions';
import SearchBar from './SearchBar';
import Filter from './Filter';
import './MainContainer.css';

const compare = (planetValue, filterValue, operator) => {
  let result = false;
  if (operator === 'maior que') result = planetValue > filterValue;
  if (operator === 'menor que') result = planetValue < filterValue;
  if (operator === 'igual a') result = planetValue === filterValue;
  return result;
};

const MainContainer = () => {
  const { searchInput, isLoading, fetchedPlanets, filterList } = useContext(
    StarWarsContext,
  );

  // filter the complete planet list from API according to active filters
  const planetFilter = () => {
    console.log('planetFilter Called', planetFilter);
    // const { data, filters, searchedPlanet } = this.props;

    // const filterArray = filters.filterByNumericValues;
    let filteredPlanet = fetchedPlanets.filter((planet) =>
      planet.name.includes(searchInput),
    );
    filterList.map((filter) => {
      filteredPlanet = filteredPlanet.filter((planet) =>
        compare(
          Number(planet[filter.column]),
          Number(filter.value),
          filter.comparison,
        ),
      );
      return filteredPlanet;
    });
    return filteredPlanet;
  };

  return (
    <div>
      {/* <div className="filterEmbender"> */}
      <div className="filterContainer">
        <div className="searchbar">
          <SearchBar />
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <span>{isLoading}</span>
      {!isLoading && ( // When API is not done Table is not rendered
        <Table planets={fetchedPlanets} filteredPlanet={planetFilter()} />
      )}
    </div>
  );
};
export default MainContainer;
