import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numericalFilter, deleteFilter } from '../actions/filterActions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByNumericValues: {
        column: '',
        comparison: '',
        value: '',
      },
      comparisonItems: ['Comparação', 'maior que', 'igual a', 'menor que'],
    };

    this.handleChange = this.handleChange.bind(this);
    this.columnRender = this.columnRender.bind(this);
    this.filterRender = this.filterRender.bind(this);
    this.buttonRender = this.buttonRender.bind(this);
    this.comparisonRender = this.comparisonRender.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      filterByNumericValues: {
        ...this.state.filterByNumericValues,
        [name]: value,
      },
    });
  }

  columnRender() {
    const colonumItemsArray = [
      'Coluna',
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]; 
    const activFilterColum = [];
    this.props.filterByNumericValues.forEach((item) => {
      activFilterColum.push(item.column);
    });
    let colonumItemsFiltered = [];
    colonumItemsFiltered = colonumItemsArray.filter(
      (n) => !activFilterColum.includes(n),
    );
    
    return (
      <select
        name="column"
        className="form-control col-md-5 mr-3 mb-2"
        data-testid="column-filter"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {colonumItemsFiltered.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  filterRender() {
    return (
      <div className="filterListContainer">
        {this.props.filterByNumericValues.map((filter, index) => (
          <div data-testid="filter" className="filterList">
            <div>
              {filter.column} {filter.comparison} {filter.value}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger button-delete"
                onClick={() => this.props.deleteFilter(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  buttonRender() {
    return (
      <button
        type="button"
        className="btn btn-primary"
        data-testid="button-filter"
        onClick={() =>
          this.props.numericalFilter(this.state.filterByNumericValues)
        }
      >
        Filter
      </button>
    );
  }

  comparisonRender() {
    return (
      <select
        name="comparison"
        className="form-control col-md-5 mb-2"
        data-testid="comparison-filter"
        value={this.state.comparison}
        onChange={this.handleChange}
      >
        {this.state.comparisonItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <div className="filters">
        <div>
          <form>
            <div className="form-group">
              <div className="form-row">
                <this.columnRender />
                <this.comparisonRender />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <input
                  name="value"
                  type="number"
                  className="form-control col-md-8 mr-1"
                  data-testid="value-filter"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <this.buttonRender />
              </div>
            </div>
          </form>
        </div>
        <div className="filterListMain">
          <this.filterRender />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterByNumericValues: state.filters.filterByNumericValues,
});

const mapDispatchToProps = (dispatch) => ({
  numericalFilter: (e) => dispatch(numericalFilter(e)),
  deleteFilter: (e) => dispatch(deleteFilter(e)),
});

Filter.propTypes = {
  numericalFilter: PropTypes.func.isRequired,
  deleteFilter: PropTypes.func.isRequired,
  filterByNumericValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
