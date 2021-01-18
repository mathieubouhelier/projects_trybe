import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovies, deleteMovie } from '../services/movieAPI';
import * as movieAPI from '../services/movieAPI';
// import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getMovies().then((movies) => this.setState({ movies }));
  }

  setRedirect() {
    this.setState({
      redirect: true,
    });
  }

  handleSubmit() {
    console.log('id', this.props.match.params.id);
    deleteMovie(this.props.match.params.id);
    this.setState({
      redirect: true,
    });
    return this.state;
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return console.log('codeclimate request');
  }

  render() {
    const { movies } = this.state;
    const { match } = this.props;
    const movie = movies[match.params.id - 1];
    // Change the condition to check the state
    if (this.state.movies === '') return 'Carregando...';

    const { title, storyline, imagePath, genre, rating, subtitle } = movie;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Título: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <Link to={`/movies/${movie.id}/edit`}>EDITAR</Link>
        <Link to={'/'}>VOLTAR</Link>
        <Link to={'/'} onClick={this.handleSubmit}>DELETAR </Link>
        {this.renderRedirect()}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.string,
};

MovieDetails.defaultProps = {
  match: '',
};

export default MovieDetails;
