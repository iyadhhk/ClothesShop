module.exports = (req, res, next) => {
  if (req.role === 'admin') {
    next();
  } else {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    next(error);
  }
};
