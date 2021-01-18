import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchBar } from '../actions/searchBarActions';
import { numericalFilter } from '../actions/filterActions';

class SearchBar extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <input
        data-testid="name-filter"
        className="form-control col-12"
        placeholder="Search a Planet"
        onChange={(e) => this.props.searchBar(e.target.value)}
        value={value}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  value: state.filters.value,
});
const mapDispatchToProps = (dispatch) => ({
  searchBar: (e) => dispatch(searchBar(e)),
  numericalFilter: (e) => dispatch(numericalFilter(e)),
});

SearchBar.propTypes = {
  searchBar: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SearchBar.defaultProps = {
  value: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
