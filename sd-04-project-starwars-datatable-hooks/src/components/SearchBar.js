import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { searchBar } from '../actions/searchBarActions';
// import { numericalFilter } from '../actions/filterActions';
import { StarWarsContext } from '../context/StarWarsContext';

// class SearchBar extends React.Component {
//   render() {

// const { value } = this.props;

const SearchBar = () => {
  const { searchInput, setSearchInput } = useContext(StarWarsContext);

  return (
    <input
      data-testid="name-filter"
      className="form-control col-12"
      placeholder="Search a Planet"
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
    />
  );
};
export default SearchBar;
// }
// const mapStateToProps = (state) => ({
//   value: state.filters.value,
// });

// const mapDispatchToProps = (dispatch) => ({
//   searchBar: (e) => dispatch(searchBar(e)),
//   numericalFilter: (e) => dispatch(numericalFilter(e)),
// });

// SearchBar.propTypes = {
//   searchBar: PropTypes.func.isRequired,
//   value: PropTypes.string,
// };

// SearchBar.defaultProps = {
//   value: null,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
