const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.dbController.listRecipes);
app.get('/me/recipes', middlewares.auth(), controllers.dbController.myRecipes);
app.get('/recipes/new', middlewares.auth(), (req, res) => {
  return res.render('new', { user: req.user });
});
app.get('/recipes/search', middlewares.auth(false), controllers.dbController.search);
app.get('/recipes/:id', middlewares.auth(false), controllers.dbController.show);
app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});
app.get('/registration', middlewares.auth(false), (req, res) => {
  return res.render('userRegistration', { message: 'Cadastre seus dados' });
});
app.get('/registeredSuccess', middlewares.auth(false), (req, res) => {
  return res.render('registeredSuccess', { message: 'Sucess' });
});
app.post('/registration', middlewares.auth(false), controllers.userController.registrationForm);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.dbController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.dbController.deleteRecipe);

app.post('/', middlewares.auth(), controllers.dbController.createRecipe);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.dbController.editRecipe);
app.post('/recipes/:id/', middlewares.auth(), controllers.dbController.saveEditedRecipe);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3001, () => console.log('Listening on port 3000'));
