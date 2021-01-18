const express = require('express');
// const productModel = require('../models/productModel');
const sharedModel = require('../models/sharedModel');
const saleModel = require('../models/saleModel');
// const sharedController = require('../models/sharedModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const productsArray = await sharedModel.getAll('sales');
  const sales = { sales: productsArray };
  // console.log('sales get', sales, productsArray);
  res.json(sales);
});

router.get('/:id', async (req, res) => {
  // console.log('getById', req.params.id);
  const sale = await sharedModel.getById(req.params.id, 'sales');
  // console.log('sale', sale);

  const returnStatus = (codeNumber, code, message) =>
    res.status(codeNumber).json({
      err: {
        code,
        message,
      },
    });

  if (!sale) {
    returnStatus('404', 'not_found', 'Sale not found');
    res.status(200).json({
      itenSmessage: 'ok',
    });
  }
});

const validation = (quantity) => {
  // console.log('inside validation', productId, quantity, sales);
  let message = 'ok';
  if (quantity < 1) {
    message = 'Wrong product ID or invalid quantity';
  }
  if (typeof quantity === 'string') {
    message = 'Wrong product ID or invalid quantity';
  }

  return message;
};

router.post('/', async (req, res) => {
  // const { productId, quantity } = req.body[0];
  // const sales = await sharedModel.getAll('sale');
  const itensSold = [];
  req.body.map((sale) => {
    const { productId, quantity } = sale;
    // console.log('inside post Sales map', sale, productId, quantity);
    itensSold.push({ productId, quantity });

    const validationMessage = validation(quantity);
    // console.log('validationMessage', validationMessage);

    // const returnValidationMessage = (codeNumber, message, code) =>
    // res.status(codeNumber).json({
    //   err: {
    //     message,
    //     code,
    //   },
    // });

    const jsonValidationMessage = {
      err: {
        message: validationMessage,
        code: 'invalid_data',
      },
    };
    if (validationMessage !== 'ok') {
      // returnValidationMessage('422', validationMessage, 'invalid_data')
      res.status(422).json(jsonValidationMessage);
    }

    return validationMessage;
  });

  // console.log('itensSold', itensSold);
  try {
    // const product = await saleModel.add(productId, quantity);
    const product = await saleModel.add(itensSold);
    res.status(200).json({
      _id: product.id,
      itensSold,
    });
  } catch (_e) {
    // res.status(500).json({ message: 'Erro ao cadastrar do product!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await sharedModel.remove(req.params.id, 'sales');
    const deletedSale = [result];
    // console.log('delete', result, deletedSale);
    if (result) {
      // console.log('bingo deleted');
      // res.status(200).json({ message: 'Removido com sucesso' });
      res.status(200).json(deletedSale);
    } else {
      res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      });
    }
  } catch (_e) {
    res.status(500).json({ message: 'Erro ao deletar pessoa!' });
  }
});

// router.put('/products/:id', async (req, res) => {
//   const { name, quantity } = req.body;
//   console.log('const update', name, quantity);
//   if (name.length < 5) {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long',
//       },
//     });
//   }

//   if (quantity < 1) {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be larger than or equal to 1',
//       },
//     });
//   }

//   if (typeof quantity === 'string') {
//     res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be a number',
//       },
//     });
//   }

//   const products = await productModel.getAll('products');
//   if (products.some((product) => product.name === name)) {
//     return res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Product already exists',
//       },
//     });
//   }

//   try {
//     await productModel.update(req.params.id, name, quantity);
//     res.status(200).json({
//       _id: req.params.id,
//       name,
//       quantity,
//     });
//   } catch (_e) {
//     res.status(500).send({ message: 'Algo deu errado' });
//   }
// });

module.exports = router;
