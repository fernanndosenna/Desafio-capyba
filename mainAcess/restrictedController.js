const express = require('express');
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth")

router.get("/restricted",adminAuth, (req,res) => {
  res.render("restricted")
})


module.exports = router;
