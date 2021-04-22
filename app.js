const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const connection = require("./database/database")
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');

//import router
const registerController = require("./user/registerController");
const loginController = require("./user/loginController");
const homeController = require("./mainAcess/homeController");
const restrictedController = require("./mainAcess/restrictedController");
const profileController = require("./profile/profileController");
const registerDocuments = require("./homeDocuments/registerDocumentsController");

  //settings//

//session login
app.use(cookieParser());
app.use(session({
     secret:"secret",
     cookie: {maxAge:60000000000},
     resave: false,
     saveUninitialized: false

}));
//flash
app.use(flash());

//middleware - váriaveis globais
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})


//ejs
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connection database
connection
        .authenticate()
        .then(() => {
            console.log("Conexao feita com sucesso")
        }).catch((error) => {
            console.log(error)
})


app.use("/", registerController);
app.use("/", loginController);
app.use("/", homeController);
app.use("/", restrictedController);
app.use("/", profileController);
app.use("/", registerDocuments);

const port = 8080;
app.listen(port, '0.0.0.0',function() {
  console.log(`App rodando na porta ${port}`);
})
