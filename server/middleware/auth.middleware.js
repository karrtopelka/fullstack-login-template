const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Authorization failed.' });
    }

    const decoded = jwt.verify(token.replace(/^"(.*)"$/, '$1'), process.env.SECRET_KEY_JWT);

    req.user = decoded;

    next();
  } catch (err) {
    console.warn(err);
    return res.status(400).send(err);
  }
};
