const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');


const authRoutes = require('./routes/auth');
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);


// get image static files show in front end
app.use('/image', express.static(path.join(__dirname, 'public/image')));


/// categories  ///
const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes); // Added leading '/'


////   product ///
// const productRoutes = require('./routes/product.route');
// app.use('/api/product', productRoutes); // Added leading '/'
const productRoutes = require('./routes/product.route');
app.use('/api', productRoutes);

//// order product
const OrderProduct = require('./routes/order.route');
app.use('/api/order', OrderProduct);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
