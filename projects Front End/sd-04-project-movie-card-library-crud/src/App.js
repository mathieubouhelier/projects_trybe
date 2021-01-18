import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import EditMovies from './pages/EditMovie';
import NewMovie from './pages/NewMovie';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div>Movie Card Library CRUD</div>
      <Link to={'/movies/new'}>ADICIONAR CARTÃO</Link>
      <Switch>
        <Route path="/movies/new" exact component={NewMovie} />
        <Route path="/movies/:id/" exact component={MovieDetails} />
        <Route path="/" exact component={MovieList} />
        <Route path="/movies/:id/edit" component={EditMovies} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
