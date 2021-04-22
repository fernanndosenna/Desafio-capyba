


function adminAuth(req, res, next){
  if(req.session.user != undefined) {
    next();
  }else{
    req.flash('success', 'Você precisa fazer login!');
    res.render("../views/userViews/login", {success : req.flash('success')})

  }
}


module.exports = adminAuth
