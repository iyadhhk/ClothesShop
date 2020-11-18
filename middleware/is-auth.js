const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecret);
  } catch (error) {
    throw error;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticatted');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.role = decodedToken.role;
  next();
};
