  export default async function getRecipesAPI(url) {
    console.log('API getbyRecipes', url);
    return fetch(url).then((recipes) => recipes
      .json()
      .then((json) => (recipes.ok ? Promise.resolve(json) : Promise.reject(json))));
  }
