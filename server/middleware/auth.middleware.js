const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Authorization failed.' });
    }

    const decoded = jwt.verify(token.replace(/^"(.*)"$/, '$1'), config.get('secretKeyJwt'));

    req.user = decoded;

    next();
  } catch (err) {
    console.warn(err);
    return res.status(400).send(err);
  }
};
