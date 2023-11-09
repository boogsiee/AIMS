const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  next();
};

const authorize = (allowedRoles) => (req, res, next) => {
  const userRole = req.user ? req.user.role : null;

  if (allowedRoles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = {
  authenticateUser,
  authorize,
};