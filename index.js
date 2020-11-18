require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

connectDB();
app.use(express.json({ extended: false }));
// for single image
// app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
// for multiple images
app.use(multer({ storage: fileStorage, fileFilter }).array('image', 2));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', authRoutes);
app.use('/store', productRoutes);

// custom errors handler middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(message);
  return res.status(statusCode).json({ message, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server up on port ${PORT}`));
