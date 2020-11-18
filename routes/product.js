const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const Product = require('../models/product');

router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/product',
  isAuth,
  isAdmin,
  [
    body('productName').trim().isLength({ min: 5 }),
    body('price').trim().isLength({ min: 2 }),
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
      // for single file
      // if (!req.file) {
      //   const error = new Error('No image provided');
      //   error.statusCode = 422;
      //   throw error;
      // }
      // form multiple file upload

      if (req.files.length === 0) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
      }
      // for single file
      // const imageUrl = req.file.path.replace('\\', '/');
      // for multiple files too
      console.log('req.files', req.files);
      const imageUrls = req.files.map((file) => file.path.replace('\\', '/'));
      console.log('image Urls', imageUrls);

      const { productName, price } = req.body;
      const product = new Product({
        productName,
        imageUrls,
        price,
      });
      const createdProduct = await product.save();
      res.status(201).json({ message: 'Product created', productId: createdProduct._id });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
);

router.get('/products', async (req, res, next) => {});

module.exports = router;
