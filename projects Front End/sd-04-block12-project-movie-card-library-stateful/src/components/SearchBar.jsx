import React from 'react';

const genres = [{ value: '', text: 'Todos' },
{ value: 'action', text: 'Ação' },
{ value: 'comedy', text: 'Comédia' },
{ value: 'thriller', text: 'Suspense' }];

export class SearchBar extends React.Component {

  render() {
    return (
      <form>
        <label htmlFor="01">Inclui o texto
        <input
          type="text" value={this.props.searchText} onChange={this.props.onSearchTextChange}
        />
        </label>
        <label htmlFor="02">Mostrar somente favoritos
        <input
          type="checkbox" checked={this.props.bookmarkedOnly}
          onChange={this.props.onBookmarkedChange}
        />
        </label>
        <label htmlFor="03"> Filtrar por gênero
          <select
            value={this.props.selectedGenre}
            onChange={this.props.onSelectedGenreChange}
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.text}</option>
            ))}
          </select>
        </label>
      </form>);
  }
}

export default SearchBar;
