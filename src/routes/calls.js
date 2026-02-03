const express = require("express");
const router = express.Router();
const { Call } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const calls = await Call.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(calls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
