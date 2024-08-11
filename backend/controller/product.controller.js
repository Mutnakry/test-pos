
const db = require('../config/db');

// Get products by category ID
exports.GetProductsByCategory = (req, res) => {
    const categoryId = req.params.categoryId; // Get category ID from request parameters
    const sql = 'SELECT * FROM product INNER JOIN categories ON product.categories_id = categories.id WHERE product.categories_id = ?';
    db.query(sql, [categoryId], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(result);
    });
};

exports.GetProducts = (req, res) => {
    const sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching products');
        }
        res.json(result);
    });
};




exports.GetPaginate = (req, res) => {
    //const sql = 'SELECT * FROM product';
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search_query || "";
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) AS total FROM product WHERE name LIKE ? OR profit LIKE ?';
  db.query(countQuery, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) throw err;
    const totalCategory = results[0].total;
    const totalPages = Math.ceil(totalCategory / limit);

    const selectQuery = 'SELECT * FROM product WHERE name LIKE ? OR profit LIKE ? LIMIT ? OFFSET ?';
    db.query(selectQuery, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset], (err, results) => {
      if (err) throw err;
      res.json({
        categories: results,
        totalPages,
        currentPage: page,
        totalCategory,
      });
    });
  });
};
