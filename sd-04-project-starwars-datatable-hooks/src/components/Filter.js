import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const comparisonItems = ['Comparação', 'maior que', 'igual a', 'menor que'];
const comparisonRender = (handleInputChange, values) => (
  <select
    name="comparison"
    className="form-control col-md-5 mb-2"
    data-testid="comparison-filter"
    onChange={handleInputChange}
    value={values.name}
  >
    {comparisonItems.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

const buttonAddFilterRender = (addFilter) => (
  <button
    type="button"
    className="btn btn-primary"
    data-testid="button-filter"
    onClick={addFilter}
  >
    Filter
  </button>
);

const inputColumnRender = (handleInputChange, values, colonumItemsFiltered) => (
  <select
    name="column"
    className="form-control col-md-5 mr-3 mb-2"
    data-testid="column-filter"
    onChange={handleInputChange}
    value={values.name}
  >
    {colonumItemsFiltered.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

const filterRender = (filterList, deleteFilter) => (
  <div className="filterListContainer">
    {filterList.map((filter, index) => (
      <div data-testid="filter" className="filterList">
        <div>
          {filter.column} {filter.comparison} {filter.value}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger button-delete"
            onClick={() => deleteFilter(index, filterList)}
          >
            X
          </button>
        </div>
      </div>
    ))}
  </div>
);

const inputRender = (handleInputChange, values) => (
  <input
    name="value"
    type="number"
    className="form-control col-md-8 mr-1"
    data-testid="value-filter"
    onChange={handleInputChange}
    value={values.name}
  />
);

const Filter = () => {
  const [values, setValues] = useState({
    // set the new form value in the corresponding array
    column: '', comparison: '', value: '' });
  const handleInputChange = (e) => { // update the form entry
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const { filterList, setFilterList } = useContext(StarWarsContext);
  const [colonumItemsFiltered, setColonumItemsFiltered] = useState([
    'Coluna', 'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const addFilter = () => {
    const { column, comparison, value } = values;
    setColonumItemsFiltered(
      colonumItemsFiltered.filter((item) => item !== column),
    );
    setFilterList([
      ...filterList,
      { column, comparison, value },
    ]);
  };

  const deleteFilter = (index2) => {
    console.log('inside deleteFilter');
    setFilterList(filterList.filter((filter, index) => index !== index2));
  };

  return (
    <div className="filters">
      <div>
        <form>
          <div className="form-group">
            <div className="form-row">
              {inputColumnRender(handleInputChange, values, colonumItemsFiltered,
              )}
              {comparisonRender(handleInputChange, values, comparisonItems)}
              {inputRender(handleInputChange, values)}
              {buttonAddFilterRender(addFilter)}
            </div>
          </div>
        </form>
      </div>
      <div>{filterRender(filterList, deleteFilter)}</div>
    </div>
  );
};

export default Filter;
