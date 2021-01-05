import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import MainPageFoods from './pages/MainPageFoods';
import MainPageDrinks from './pages/MainPageDrinks';
import DetailsPage from './pages/DetailsPage';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Explore from './pages/Explore';
import ExploreDrinksOrMeals from './pages/ExploreDrinksOrMeals';
import ExploreByIngredient from './pages/ExploreByIngredients';
import ExploreByArea from './pages/ExploreByArea';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={MainPageFoods} />
      <Route exact path="/bebidas" component={MainPageDrinks} />
      <Route exact path="/comidas/:id" component={DetailsPage} />
      <Route exact path="/bebidas/:id" component={DetailsPage} />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={RecipeInProgress}
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={RecipeInProgress}
      />
      <Route exact path="/receitas-feitas" component={DoneRecipes} />
      <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
      <Route exact path="/explorar" component={Explore} />
      <Route exact path="/explorar/comidas" component={ExploreDrinksOrMeals} />
      <Route exact path="/explorar/bebidas" component={ExploreDrinksOrMeals} />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ExploreByIngredient}
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ExploreByIngredient}
      />
      <Route exact path="/explorar/comidas/area" component={ExploreByArea} />
      <Route exact path="/perfil" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
