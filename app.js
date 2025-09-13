const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");



const mongoUrl ="mongodb://127.0.0.1:27017/wanderlust";
main().then(() =>{
 console.log("connection to DB")
}).catch((err) =>{
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" ,ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions = {
  secret:"mysecretcode",
  resave:false,
  saveUninitialized:true,
  cokie:{
    expires:Date.now() + 7 * 24 * 60 * 60 *1000,
    maxAge:7 * 24 * 60 * 60 *1000,
    httpOnl:true,
  }
};


app.get("/",(req,res)=>{
    res.send("hello....")
})

app.use(session(sessionOptions));
app.use(flash());


app.use((req,res, next) =>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})






//litings 
app.use("/listings", listings);

// reviews
app.use("/listings/:id/reviews", reviews);



app.all(/.*/, (req, res, next)=>{
  next(new expressError(404,"page not found"))
})

app.use((err, req, res, next) =>{
  let {statusCode=500 , message= "something went wrong"} = err;
  res.status(statusCode).render("error.ejs",{message});
})


app.listen(8080,()=>{
    console.log("server is listening on port:8080");
});