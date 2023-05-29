const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ errors: [{ msg: 'you are not authorized' }] });
  }
  try {
    const decoded = jwt.verify(token, 'supersecret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: 'you are not authorized', error }] });
  }
};
module.exports = isAuth;

