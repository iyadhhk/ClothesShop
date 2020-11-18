const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
const bcrypt = require('bcrypt');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

// try is-auth middleware to get user info
router.get('/', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password'); //we will get user data and leave off the password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('username').trim().not().isEmpty(),
    body('password').trim().isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const { email, username, password } = req.body;

      const existedUser = await User.findOne({ email });
      if (existedUser) {
        const error = new Error('E-mail adress already exists');
        error.statusCode = 409;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        username,
        password: hashedPassword,
      });
      const createdUser = await user.save();
      res.status(201).json({ message: 'User created', userId: createdUser._id });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error('A user with this email could not be found');
        error.statusCode = 401;
        error.data = [{ param: 'email', msg: 'wrong email' }];
        throw error;
      }
      const isEqual = await bcrypt.compare(password, user.password);
      console.log('compare password', isEqual);
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        error.data = [{ param: 'password', msg: 'wrong password' }];
        throw error;
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
          role: user.role,
        },
        jwtSecret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, userId: user._id.toString() });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
