const express = require('express');
const userModel = require('../models/userModel');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

// Post/Create one user

router.post(
  '/',
  userValidation.validatePresenceOfUsernameEmailPassword,
  userValidation.validateEmail,
  userValidation.validateEmailIsUnique,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.registerUser(name, email, password);
      res.status(201).json({ user });
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao salvar o usuário no banco',
        _e,
      });
    }
  },
);

module.exports = router;
