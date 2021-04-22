const express = require('express');
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const Documents  = require("../homeDocuments/Documents");
const User = require("../user/User");


router.get("/home", adminAuth,(req,res) => {
  User.findOne({
    where: {id:req.session.user.id}


  }).then(user => {

  Documents.findAll({
    where: {userId: user.id}
  }).then(documents => {
    res.render("home", {documents: documents, user:user});
  })
  })
})


module.exports = router;
