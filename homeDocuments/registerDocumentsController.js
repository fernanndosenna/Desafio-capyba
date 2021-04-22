const express = require("express");
const router = express.Router();
const Documents = require("./Documents");
const adminAuth = require("../middlewares/adminAuth");

router.get("/registerDocuments", adminAuth,(req,res) => {
  res.render("../views/homeDocumentsViews/registerDocuments")
})


router.post("/saveDocuments",adminAuth, (req,res) => {//salvando documentos
  var cpf = req.body.cpf;
  var rg = req.body.rg;
  var title = req.body.title;
  var ctps = req.body.ctps;
  var phone = req.body.ctps;
  var userId = req.session.user.id;

    Documents.create({
      cpf: cpf,
      rg: rg,
      title: title,
      ctps: ctps,
      phone: phone,
      userId: userId
    }).then(() => {
      res.redirect("/home")
    }).catch((err) => {
      res.send("Houve um erro durante o salvamento de documentos!" + err)
    })


})


router.get("/editDocuments/:id",adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
      res.redirect("/home")
    }
    Documents.findByPk(id).then(documents => {
      if(documents != undefined){
        res.render("../views/homeDocumentsViews/edit_documents", {documents: documents})

      }else{
        res.redirect("/home")
      }
    }).catch((err) => {
      res.redirect("/home")
    })
})

router.post("/updateDocuments", adminAuth,(req,res) => {
  var id = req.body.id;
  var cpf = req.body.cpf;
  var rg = req.body.rg;
  var title = req.body.title;
  var ctps = req.body.ctps;
  var phone = req.body.ctps;

  Documents.update({cpf: cpf, rg: rg, title: title, ctps: ctps, phone: phone}, {
    where: {id: id}
  }).then(() => {
    res.redirect("/home")
  })
})




module.exports = router;
