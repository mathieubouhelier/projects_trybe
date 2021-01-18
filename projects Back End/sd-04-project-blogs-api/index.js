const express = require('express');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/post', controllers.blogsController);

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send({ message });
});

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
