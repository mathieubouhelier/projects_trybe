const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/createJWT');
const { validateJWT } = require('../auth/validateJWT');

const router = express.Router();
const userValidation = require('../middlewares/userValidation');

router.post(
  '/',
  userValidation.userDataValidation,
  userValidation.emailAlreadyExist,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const emailFromDB = await User.create({
        displayName,
        email,
        password,
        image,
      });
      const { password: _, ...userWithoutPassword } = emailFromDB;
      const token = await createToken(userWithoutPassword);
      return res.status(201).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ message: 'Erro ao salvar o usuário no banco' });
    }
  },
);

router.get('/', validateJWT, async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: 'Erro ao puxar os usuários no banco' });
  }
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: 'Erro ao puxar um usuário no banco' });
  }
});

router.delete('/me', validateJWT, async (req, res) => {
  try {
    const { id } = req.data.dataValues;
    await User.destroy({ where: { id } });
    res.status(204).end();
  } catch (e) {
    console.log('pb', e.message);
    res.status(500).send({ message: 'Erro ao deletar um usuário no banco' });
  }
});

module.exports = router;
