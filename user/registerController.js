const express = require('express');
const router = express.Router();
const User = require('./User');
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcryptjs');


router.get("/register", (req,res) => {
  res.render("../views/userViews/register");
})

//multer
var storage = multer.diskStorage({
  destination: function(req,res, cb){
    cb(null, "uploads/")
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage})
router.post("/register/save", upload.single("file"), (req,res) => {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var password2 = req.body.password2;
  var file = req.file.originalname;

  if(password != password2){
    res.send("<h1>Senhas diferentes!</h1>")
    res.redirect("/register")
  }
  if(password.length < 4){
    res.send("<h1>Senha com mínimo de 4 caracteres!</h1>")
  }

  User.findOne({where: {email: email}}).then(user => {
    if(user == undefined){

               var salt = bcrypt.genSaltSync(10);
               var hash = bcrypt.hashSync(password, salt);

      User.create({
        name: name,
        email: email,
        password: hash,
        file: `uploads/${file}`
      }).then(() => {
          res.redirect("/");
      }).catch((err) => {
        res.send("Houve um erro durante a criação do usuário! ");
      })

    }else{
      res.redirect("/register");
    }

  })
})

module.exports = router;
