const jwt = require("jsonwebtoken");
const TOKEN = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récuperation du Token dans la reqûete
    const decodedToken = jwt.verify(token, TOKEN); // On regarde si ça match
    const username = decodedToken.username; // Nous extrayons le username de notre token
    req.auth = {
      username: username,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
