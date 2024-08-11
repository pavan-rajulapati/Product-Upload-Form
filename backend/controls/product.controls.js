const express = require('express');
const multer = require('multer');
const Product = require('../models/product.model');

const app = express();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
}).array('images', 6); 


const handleProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading images', error: err.message });
    }

    const { name, price, actualPrice, description, category, stock, sizes, keyWords } = req.body;

    try {
      const imagePaths = req.files.map(file => file.path);

      const item = new Product({
        name,
        price,
        actualPrice,
        description,
        category,
        stock,
        images: imagePaths,
        sizes,
        keyWords
      });


      await item.save();

      return res.status(201).json({ message: 'Product created successfully', product: item });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
};

module.exports = handleProduct
