const { db } = require("../conf");
const express = require("express");
const router = express.Router();

router.post("/signIn", async (req, res) => {
  try {
    const response = await db.query(`INSERT INTO users SET ?`, [req.body]);
    res.status(201).send(req.body);
  } catch (err) {
    res.status(500).send("Nope, sorry, I iz broken !", err);
  }
});

module.exports = router;
