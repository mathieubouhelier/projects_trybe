const express = require('express');
const productModel = require('../models/productModel');
const sharedModel = require('../models/sharedModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const productsArray = await sharedModel.getAll('products');
  const products = { products: productsArray };
  res.json(products);
});

router.get('/:id', async (req, res) => {
  // console.log('getById', req.params.id);
  const product = await sharedModel.getById(req.params.id, 'products');
  // console.log('product', product);

  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  res.status(200).json({
    name: product.name,
    quantity: product.quantity,
  });
});

const validation = (name, quantity, products) => {
  let message = 'ok';

  if (name.length < 5) {
    message = '"name" length must be at least 5 characters long';
  }
  if (quantity < 1) {
    message = '"quantity" must be larger than or equal to 1';
  }
  if (typeof quantity === 'string') {
    message = '"quantity" must be a number';
  }
  if (products.some((product) => product.name === name) && quantity > 1) {
    message = 'Product already exists';
  }
  return message;
};

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const products = await sharedModel.getAll('products');
  const validationMessage = await validation(name, quantity, products);
  // console.log('validationMessage', validationMessage);

  if (validationMessage !== 'ok') {
    res.status(422).json({
      err: {
        message: validationMessage,
        code: 'invalid_data',
      },
    });
  }

  try {
    const product = await productModel.add(name, quantity);
    res.status(201).json({
      _id: product.id,
      name,
      quantity,
    });
  } catch (_e) {
    // res.status(500).json({ message: 'Erro ao cadastrar do product!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await sharedModel.remove(req.params.id, 'products');

    if (result) {
      res.status(200).json({ message: 'Removido com sucesso' });
    } else {
      res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
  } catch (_e) {
    res.status(500).json({ message: 'Erro ao deletar pessoa!' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  // console.log('const update', name, quantity);
  if (name.length < 5) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity < 1) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (typeof quantity === 'string') {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const products = await sharedModel.getAll('products');
  if (products.some((product) => product.name === name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  try {
    await productModel.update(req.params.id, name, quantity);
    res.status(200).json({
      _id: req.params.id,
      name,
      quantity,
    });
  } catch (_e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
