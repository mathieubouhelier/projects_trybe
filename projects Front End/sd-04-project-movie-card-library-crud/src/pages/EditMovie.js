import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';
import { getMovies } from '../services/movieAPI';


class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: ' ',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getMovies().then((movies) => this.setState({ movies }));
  }

  handleSubmit(updatedMovie) {
  }

  render() {
    // const { status, shouldRedirect, movies } = this.state;
    const { shouldRedirect, movies } = this.state;
    const { match } = this.props;
    const movie = movies[match.params.id - 1];
    if (shouldRedirect) {
      // Redirect
    }

    if (this.state.movies === ' ') return 'Carregando...';
    // if (status === 'loading') {
      // render Loading
    // }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.string,
};

EditMovie.defaultProps = {
  match: '',
};

export default EditMovie;
