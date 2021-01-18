const { Op } = require('sequelize');
const rescue = require('express-rescue');
const express = require('express');
const { Posts, User } = require('../models');
const { validateJWT } = require('../auth/validateJWT');

const router = express.Router();
const blogValidation = require('../middlewares/blogValidation');

router.post(
  '/',
  validateJWT,
  blogValidation.blogDataValidation,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const post = { title, content, userId: req.data.dataValues.id };
    await Posts.create(post);
    return res.status(201).json(post);
  }),
);

router.get(
  '/',
  validateJWT,
  rescue(async (req, res) => {
    const products = await Posts.findAll({
      include: { model: User, as: 'user' },
    });

    res.status(200).json(products);
  }),
);

router.get(
  '/search',
  validateJWT,
  rescue(async (req, res) => {
    const { q } = req.query;

    const searchedPost = await Posts.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: 'user',
    });

    return res.status(200).json(searchedPost);
  }),
);

router.get(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const product = await Posts.findByPk(req.params.id, {
      include: { model: User, as: 'user' },
    });
    if (product === null) {
      res.status(404).json({ message: 'Post não existe' });
    }
    res.status(200).json(product);
  }),
);

router.put(
  '/:id',
  validateJWT,
  blogValidation.blogDataValidation,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const post = { title, content, userId: req.data.dataValues.id };

    const userId = req.data.dataValues.id;
    const product = await Posts.findByPk(req.params.id, {
      include: { model: User, as: 'user' },
    });
    if (userId !== product.userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await Posts.update(post, {
      where: { id: req.params.id },
    });
    return res.status(200).json(post);
  }),
);

router.delete(
  '/:id',
  validateJWT,
  rescue(async (req, res) => {
    const userId = req.data.dataValues.id;
    const product = await Posts.findByPk(req.params.id, {
      include: { model: User, as: 'user' },
    });
    if (product === null) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    if (userId !== product.userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await Posts.destroy({
      where: { id: req.params.id },
    });

    return res.status(204).json({ message: 'Blog excluído com sucesso' });
  }),
);

module.exports = router;
