// implement MovieLibrary component here
import React from 'react';
// import movies from './../data';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: movies,
      filteredMovies: this.props.filteredMovies,
    };

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.AddMoviefunc = this.AddMoviefunc.bind(this);
    this.moviesFilter = this.moviesFilter.bind(this);
  }

  onSearchTextChange(event) {
    this.setState({ searchText: event.target.value });
  }
  onBookmarkedChange(event) {
    this.setState({ bookmarkedOnly: event.target.checked });
  }
  onSelectedGenreChange(event) {
    this.setState({ selectedGenre: event.target.value });
  }
  AddMoviefunc(addMovie) {  // add a movie do propo movies after button been clicked
    this.setState((state) => ({ movies: [...state.movies, addMovie] }));  // "push" addmovie movies
  }

  moviesFilter() { // create a filter of displayed movies based on search bar and options
    // Need to add 3 if below? Have to be checked
    const { searchText, selectedGenre } = this.state; // Porque tirar movies não passe os testes?
    let filteredMovies = this.state.movies.filter((movie) => movie.title.includes(searchText)
      || movie.subtitle.includes(searchText)
      || movie.storyline.includes(searchText));
    filteredMovies = filteredMovies.filter((movie) => movie.genre.includes(selectedGenre));
    if (this.state.bookmarkedOnly) {
      filteredMovies = filteredMovies.filter((movie) => movie.bookmarked === true);
    }
    return filteredMovies;
  }

  render() {
    return (
      <div>
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={(event) => this.onSearchTextChange(event)}
          bookmarkedOnly={this.state.bookmarkedOnly}
          onBookmarkedChange={(event) => this.onBookmarkedChange(event)}
          selectedGenre={this.state.selectedGenre}
          onSelectedGenreChange={(event) => this.onSelectedGenreChange(event)}
        />
        <MovieList movies={this.moviesFilter()} />
        <AddMovie onClick={this.AddMoviefunc} />

      </div>
    );
  }
}

export default MovieLibrary;
