const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', productController);
app.use('/sales', saleController);

app.listen(port, () => console.log('We are listening on port 3000'));
