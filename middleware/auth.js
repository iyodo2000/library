const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Authentication required' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // Attach user data to the request
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
