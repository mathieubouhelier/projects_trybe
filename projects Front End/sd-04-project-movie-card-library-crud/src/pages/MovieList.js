import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
import { getMovies } from '../services/movieAPI';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: '',
    };
  }

  componentDidMount() {
    // console.log("getMovies",getMovies());
    getMovies().then((movies) => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;
    // Render Loading here if the request is still happening
    if (this.state.movies === '') return 'Carregando...';
    return (
      <div data-testid="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    );
  }
}

export default MovieList;
