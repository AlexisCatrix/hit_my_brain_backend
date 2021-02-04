const express = require("express");
const passport = require("passport");
const router = express.Router();
const { db, jwt_rounds, jwt_secret } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../passport-strategies");

router.post("/signup", async (req, res) => {
  const formData = req.body;
  formData.password = bcrypt.hashSync(formData.password, jwt_rounds);
  db.query("INSERT INTO users SET ?", formData, (errSql, resSql) => {
    if (!errSql) {
      delete formData.password;
      formData.id = resSql.insertId;
      const token = jwt.sign(formData, jwt_secret);
      res.status(201).json(token);
    } else {
      res.status(500).json(errSql);
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign(req.user, jwt_secret);
  res.status(200).json(token);
});

module.exports = router;