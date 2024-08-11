const express = require('express');
const { GetProductsByCategory,GetProducts,GetPaginate } = require('../controller/product.controller');

const router = express.Router();

// Route to get products by category ID
router.get('/products/category/:categoryId', GetProductsByCategory);
router.get('/getAllproduct', GetProducts);

router.get('/getpaginate', GetPaginate);

module.exports = router;
