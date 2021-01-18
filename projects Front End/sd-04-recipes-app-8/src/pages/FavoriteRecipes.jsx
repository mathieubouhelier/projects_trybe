import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ExploreHeader from '../components/ExploreHeader';
import ShareButton from '../components/ShareButton';

const rendersFilterOption = (filterSetting, setFilterSetting) => {
  const filterOptionInput = [
    { label: 'Meal', value: 'comida', testid: 'filter-by-food-btn' },
    { label: 'Drink', value: 'bebida', testid: 'filter-by-drink-btn' },
    { label: 'All', value: '', testid: 'filter-by-all-btn' },
  ];
  return (
    <div>
      {filterOptionInput.map((item) => (
        <button
          key={item.label}
          name="filterValue"
          value={item.value}
          data-testid={item.testid}
          onClick={(event) => setFilterSetting(event.target.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const FavoriteRecipes = () => {
  const { favoriteListFetching } = useSelector((state) => state.FavoritesReducer);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [favoriteListFetching]);
  const [filterSetting, setFilterSetting] = useState('');
  return (
    <div>
      <ExploreHeader title={'Receitas Favoritas'} />
      {rendersFilterOption(filterSetting, setFilterSetting)}
      <div>
        {favoriteRecipes != null &&
          favoriteRecipes
            .filter((recipe) => recipe.type.includes(filterSetting))
            .map((recipe, index) => (
              <div>
                <FavoriteButton testid={index} recipe={[{ id: recipe.id }]} />
                <ShareButton
                  idInput={recipe.id}
                  testid={index}
                  type={`${recipe.type}s`}
                />
                {recipe.type === 'comida' && (
                  <h4 data-testid={`${index}-horizontal-top-text`}>
                    {`${recipe.area} - ${recipe.category}`}
                  </h4>
                )}
                {recipe.type === 'bebida' && (
                  <h4 data-testid={`${index}-horizontal-top-text`}>{recipe.alcoholicOrNot}</h4>
                )}
                <Link to={`/${recipe.type}s/${recipe.id}`}>
                  <h3 data-testid={`${index}-horizontal-name`}>{recipe.name}</h3>
                  <img
                    data-testid={`${index}-horizontal-image`}
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-photo"
                  />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
