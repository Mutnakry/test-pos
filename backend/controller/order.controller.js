
const db = require('../config/db');

// Get products by category ID
exports.OrderProduct =async (req, res) => {
    try {
        const { customerId, products } = req.body;
    
        // Insert customer details into the 'customer' table if customerId is not provided
        let customerIdFromDB = customerId;
        if (!customerId) {
          const { name, dob,discount,total_pay,person_pay,debt_pay } = req.body;
          const sqlCustomer = "INSERT INTO customer (name, dob,discount,total_pay,person_pay,debt_pay) VALUES (?,?,?,?,?,?)";
          const customerValues = [name, dob,discount,total_pay,person_pay,debt_pay];
          const [customerResult] = await db.promise().query(sqlCustomer, customerValues);
          customerIdFromDB = customerResult.insertId;
        }
    
        // Calculate total and insert orders
        for (const product of products) {
          const { qty, price, total, product_id,discount } = product;
          //const calculatedTotal = qty * price; // Calculate the total amount for each product
    
          // Insert order details into the 'order' table
          const sqlOrder = "INSERT INTO `order` (customer_id, qty, price, total, product_id,discount) VALUES (?, ?, ?, ?, ?,?)";
          const orderValues = [customerIdFromDB, qty, price, total, product_id,discount];
          await db.promise().query(sqlOrder, orderValues);
        }
    
        // Respond with success message
        res.status(201).json({ message: 'Order created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the order' });
      }
};
