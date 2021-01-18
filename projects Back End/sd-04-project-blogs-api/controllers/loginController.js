const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/createJWT');

const router = express.Router();
const userValidation = require('../middlewares/userValidation');

router.post('/', userValidation.loginDataValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailFromDB = await User.findOne({ where: { email } });

    if (!emailFromDB || emailFromDB.password !== password) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    const { password: _, ...userWithoutPassword } = emailFromDB;
    const token = await createToken(userWithoutPassword);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: 'Erro ao logar o usuário no banco' });
  }
});

module.exports = router;
