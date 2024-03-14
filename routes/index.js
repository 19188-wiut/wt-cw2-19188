const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Event Planning App" })
);

module.exports = router;
