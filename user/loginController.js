const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');


router.get("/", (req,res) => {
  res.render("../views/userViews/login");
})


router.post("/authenticate", (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({where: {email: email}}).then(user => {
    if (user != undefined){

      var correct = bcrypt.compareSync(password, user.password)

      if(correct){
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect("/home");
      }else{
        req.flash("error_msg", "Usuário incorreto!")
        res.render("../views/userViews/login",{ error_msg: req.flash("error_msg")});
      }

    }else{
      res.redirect("/")
    }
  })

})



module.exports = router;
