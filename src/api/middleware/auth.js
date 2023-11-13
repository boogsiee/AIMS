/* eslint-disable import/no-anonymous-default-export */
import { verify } from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; // Attach user information to the request object
    next();
  });
};

const authorize = (allowedRoles) => (req, res, next) => {
  const userRole = req.user ? req.user.role : null;

  if (allowedRoles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

export default {
  authenticateUser,
  authorize,
};
