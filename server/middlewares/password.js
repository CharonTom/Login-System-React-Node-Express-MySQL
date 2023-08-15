const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(5) // Minimum length 5
  .is()
  .max(25) // Maximum length 25
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .not()
  .spaces() // Should not have spaces
  .has()
  .digits() // Must have at least 1 digit
  .has()
  .symbols();

module.exports = passwordSchema;

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      error:
        "Le mot de passe doit contenir entre 5 et 25 caractères, au moins une lettre majuscule et minuscule ainsi que 1 chiffre. Pas de caractère spéciaux.",
    });
  } else {
    next();
  }
};
