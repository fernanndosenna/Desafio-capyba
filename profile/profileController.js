const express = require('express');
const router = express.Router();
const User = require("../user/User");
const adminAuth = require("../middlewares/adminAuth")
const session = require("express-session");


router.get("/profilesettings",adminAuth, (req,res) => { //exibindo configurações de usuário por sessão

  User.findOne({
    where: {id:req.session.user.id}
  }).then(user => {
    res.render("../views/profileViews/profile", {user: user});
  })

})


router.get("/editprofile/:id",adminAuth, (req,res) => {
  var id = req.params.id;

  if(isNaN(id)){
    res.redirect("/profilesettings")
  }


  User.findByPk(id).then(user => {
    if(user != undefined){
      res.render("../views/profileViews/edit_profile", {user: user})

    }else{
      res.redirect("/profilesettings");
    }

  }).catch(err => {
    res.redirect("/profilesettings")
  })

})

router.post("/updateprofile", (req,res) => {
  var id = req.body.id;
  var email = req.body.email;
  var name = req.body.name;

  User.update({name:name, email:email},{
    where: {id:id}
  }).then(() => {
    res.redirect("/profilesettings")
  })
})

module.exports = router;
