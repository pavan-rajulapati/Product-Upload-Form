const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
  warenty : {
    type : Number,
    required : false,
    enum : [0,1,2,3,4,5,6],
    default : 0
  },
  images: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  sizes: {
    type: [String],
    trim: true, 
  },
  keyWords: [
    {
      type: [String],
      trim: true, 
    },
  ],
},{timestamp : true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
