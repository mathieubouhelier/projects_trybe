const express = require('express');
const path = require('path');
const userControllers = require('./controllers/userControllers');
const loginControllers = require('./controllers/loginControllers');
const recipeControllers = require('./controllers/recipeControllers');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/users', userControllers);
app.use('/login', loginControllers);
app.use('/recipes', recipeControllers);
app.use('/images', express.static(path.join(__dirname, '/images')));
app.get('/hello World', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('Example app listening on port: ', port));
