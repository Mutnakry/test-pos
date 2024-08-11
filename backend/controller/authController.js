const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register user
exports.register = (req, res) => {
  const { username, password, usertype } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO user (username, password, usertype) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, usertype], (err, result) => {
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered successfully');
  });
};

// // Login user
// exports.login = (req, res) => {
//   const { username, password } = req.body;

//   const query = 'SELECT * FROM user WHERE username = ?';
//   db.query(query, [username], (err, results) => {
//     if (err) {
//       return res.status(500).send('Error logging in');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('User not found');
//     }

//     const user = results[0];
//     const isPasswordValid = bcrypt.compareSync(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid password');
//     }

//     const token = jwt.sign({ id: user.id, usertype: user.usertype }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

//     res.status(200).send({ auth: true, token, usertype: user.usertype });
//   });
// };


// Example modification in your login controller
exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM user WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ id: user.id, usertype: user.usertype }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

    res.status(200).send({ auth: true, token, usertype: user.usertype, username: user.username });
  });
};
