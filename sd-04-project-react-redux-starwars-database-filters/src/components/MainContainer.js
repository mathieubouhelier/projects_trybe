import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';
import { fetchPlanet } from '../actions/planetActions';
import SearchBar from './SearchBar';
import Filter from './Filter';
import './MainContainer.css';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.compare = this.compare.bind(this);
    this.planetFilter = this.planetFilter.bind(this);
  }

  componentDidMount() {
    const { getPlanet } = this.props;
    getPlanet();
  }

  // used to compare value of the planet and filter value with >, <, and ===
  compare(planetValue, filterValue, operator) {
    let result = false;
    if (operator === 'maior que') result = planetValue > filterValue;
    if (operator === 'menor que') result = planetValue < filterValue;
    if (operator === 'igual a') result = planetValue === filterValue;
    this.bar = result;
    return result;
  }

  // filter the complete planet list from API according to active filters
  planetFilter() {
    const { data, filters, searchedPlanet } = this.props;
    const filterArray = filters.filterByNumericValues;
    let filteredPlanet = data.filter((planet) =>
      planet.name.includes(searchedPlanet),
    );
    filterArray.map((filter) => {
      filteredPlanet = filteredPlanet.filter((planet) =>
        this.compare(
          Number(planet[filter.column]),
          Number(filter.value),
          filter.comparison,
        ),
      );
      return filteredPlanet;
    });
    return filteredPlanet;
  }

  render() {
    const { data, isLoading } = this.props;
    return (
      <div>
          <div className="filterContainer">
            <div className="searchbar">
              <SearchBar />
            </div>
            <div>
              <Filter />
            </div>
          </div>
        {!isLoading && ( // When API is not done Table is not rendered
          <Table planets={data} filteredPlanet={this.planetFilter()} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.planetReducer.isLoading,
  data: state.planetReducer.data,
  searchedPlanet: state.filters.filterByName.name,
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  getPlanet: () => dispatch(fetchPlanet()),
});

MainContainer.propTypes = {
  getPlanet: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  searchedPlanet: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  filters: PropTypes.shape(),
};

MainContainer.defaultProps = {
  data: [],
  filters: null,
  searchedPlanet: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
