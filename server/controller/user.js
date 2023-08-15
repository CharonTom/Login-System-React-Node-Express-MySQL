const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const TOKEN = process.env.SECRET_KEY;

exports.signup = (req, res, next) => {
  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ? OR username =?";
  const values = [req.body.email, req.body.username];

  db.query(checkUserQuery, values, (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      const existingFields = {};
      data.forEach((user) => {
        if (user.email === req.body.email) {
          existingFields.email = "This email is already registered";
        }
        if (user.username === req.body.username) {
          existingFields.username = "This username is already taken";
        }
      });
      return res.status(409).json(existingFields);
    }

    // If the user doesn't exist, proceed with registration
    const insertUserQuery =
      "INSERT INTO users (`username`,`email`,`password`,`date`) VALUES ?";

    bcrypt.hash(req.body.password, 10).then((hash) => {
      const values = [[req.body.username, req.body.email, hash, req.body.date]];
      db.query(insertUserQuery, [values], (err) => {
        if (err) return res.json(err);
        return res.json("User has been created");
      });
    });
  });
};

exports.login = (req, res, next) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password).then((valid) => {
        if (!valid) {
          return res.status(401).json({
            message: `the user ID or the password seems to be wrong`,
          });
        }

        return res.status(200).json({
          username: data[0].username,
          token: jwt.sign({ username: data[0].username }, TOKEN, {
            expiresIn: "24h",
          }),
        });
      });
    } else {
      return res.status(401).json({ message: `Can't find this user` });
    }
  });
};

exports.user = (req, res, next) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
