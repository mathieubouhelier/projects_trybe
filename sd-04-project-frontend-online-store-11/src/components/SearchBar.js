import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    const { searchText, textChange, onClickSearch } = this.props;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="searchText"
          value={searchText}
          onChange={textChange}
        />
        <button
          type="button"
          onClick={onClickSearch}
          data-testid="query-button"
        >
          buscar
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.{' '}
        </p>
      </div>
    );
  }
}

export default SearchBar;
