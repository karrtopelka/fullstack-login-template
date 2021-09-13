const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = new Router();

router.patch('/update', async (req, res) => {
  try {
    const { id, name, lastName, avatar, age, country, region } = req.body;

    await User.updateOne({ _id: id }, { name, lastName, avatar, age, country, region });

    const user = await User.findOne({ _id: id });

    return res.json({
      user,
      message: 'Successfully updated',
    });
  } catch (err) {
    console.warn(err);
    res.status(400).json({
      message: 'Error while update',
    });
  }
});

router.patch('/private-update', async (req, res) => {
  try {
    const { id, email, password } = req.body;

    const actual = await User.findOne({ _id: id });
    const candidate = await User.findOne({ email });

    if (actual.email !== candidate?.email && candidate) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 8);
    }

    await User.updateOne(
      { _id: id },
      {
        email,
        password: hashedPassword,
      },
    );

    const user = await User.findOne({ _id: id });

    return res.json({
      user,
      message: 'Successfully updated',
    });
  } catch (err) {
    console.warn(err);
    console.log(err);
    res.status(400).json({
      message: 'Error while update',
    });
  }
});

module.exports = router;
