import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [fetchedPlanets, setFetchedPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterList, setFilterList] = useState([]);

  const context = {
    searchInput,
    setSearchInput,
    fetchedPlanets,
    setFetchedPlanets,
    isLoading,
    setIsLoading,
    filterList,
    setFilterList,
  };

  useEffect(() => {
    // Must be refactored to call API
    async function fetchData() {
      setIsLoading(true);
      const APIURL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(`${APIURL}`);
      response
        .json()
        .then((data) => {
          setFetchedPlanets(data.results);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
    console.log('inside useEffect fetch');
    fetchData();
  }, []);

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.string,
};

StarWarsProvider.defaultProps = {
  children: null,
};

export { StarWarsProvider, StarWarsContext };
