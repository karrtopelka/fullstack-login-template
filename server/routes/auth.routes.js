const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Uncorrect password (min length is 8, and max is 25)').isLength({
      min: 8,
      max: 25,
    }),
  ],
  async (req, res) => {
    try {
      const validation = validationResult(req);

      if (!validation.isEmpty()) {
        return res.status(400).json({ message: 'validation failed.', validation });
      }

      const { email, password: enteredPassword } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Registration failed. User exists' });
      }

      const hashedPassword = await bcrypt.hash(enteredPassword, 8);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      const { password, __v, ...sendUser } = JSON.parse(JSON.stringify(user));

      const token = jwt.sign({ id: user.id }, config.get('secretKeyJwt'), { expiresIn: '1hr' });

      return res.json({
        message: 'Registration successful',
        user: sendUser,
        token,
      });
    } catch (err) {
      console.warn(err);
      res.json({
        message: 'Error while submitting registration',
      });
    }
  },
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User was not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    const { id, email: userEmail, name, lastName, avatar } = user;

    const token = jwt.sign({ id: user.id }, config.get('secretKeyJwt'), { expiresIn: '1hr' });

    return res.json({
      token,
      user: {
        _id: id,
        email: userEmail,
        name,
        lastName,
        avatar,
      },
      message: 'Successful login',
    });
  } catch (err) {
    console.warn(err);
    res.json({
      message: 'Error while submitting login',
    });
  }
});

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const { id, email: userEmail, name, lastName, avatar } = user;

    const token = jwt.sign({ id: user.id }, config.get('secretKeyJwt'), { expiresIn: '1h' });

    return res.json({
      token,
      user: {
        _id: id,
        email: userEmail,
        name,
        lastName,
        avatar,
      },
      message: 'Successful login',
    });
  } catch (err) {
    console.warn(err);
    res.json({
      message: err.message,
    });
  }
});

module.exports = router;
