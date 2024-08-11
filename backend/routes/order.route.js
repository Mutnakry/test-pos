const express = require('express');
const { OrderProduct } = require('../controller/order.Controller');

const router = express.Router();

router.post('/', OrderProduct);

module.exports = router;
