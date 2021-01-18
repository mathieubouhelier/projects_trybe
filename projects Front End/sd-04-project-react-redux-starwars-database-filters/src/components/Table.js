import React from 'react';
import PropTypes from 'prop-types';

const tableHeaders = [
  'name',
  'climate',
  // 'created',
  'diameter',
  // 'edited',
  // 'films',
  'gravity',
  'orbital_period',
  'population',
  'rotation_period',
  'surface_water',
  'terrain',
  'url',
];

class Table extends React.Component {
  render() {
    const { filteredPlanet } = this.props;

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-responsive">
            <thead className="thead-dark">
              <tr>
                {tableHeaders.map((header) => (
                  <th scope="col" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPlanet.map((planet) => (
                <tr key={planet.name}>
                  {tableHeaders.map((header) => (
                    <td>{planet[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  filteredPlanet: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  filteredPlanet: null,
};
export default Table;
