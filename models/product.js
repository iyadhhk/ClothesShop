const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    // for single file
    // imageUrl: {
    //   type: String,
    //   required: true,
    // },
    imageUrls: {
      type: [String],
      required: true,
    },
    // details: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
