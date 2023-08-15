const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const auth = require("../middlewares/auth");
const passwordFilter = require("../middlewares/password");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // Temps défini (en minutes) pour tester l'application
  max: 10, // essais max par adresse ip
});

router.post("/signup", passwordFilter, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.get("/users", auth, userCtrl.user);

module.exports = router;
