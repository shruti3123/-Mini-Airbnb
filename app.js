const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const mongoUrl ="mongodb://127.0.0.1:27017/wanderlust";
main().then(() =>{
 console.log("connection to DB")
}).catch((err) =>{
    console.log(err)
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

app.get("/",(req,res)=>{
    res.send("hello....")
})

// index route
app.get("/listings", async(req,res) =>{
   const allListings = await listing.find({});
   res.render("listings/index.ejs" ,{allListings});
})

// new route
app.get("/listings/new" ,(req, res) =>{
  res.render("listings/new.ejs")
})

// show route
app.get("/listings/:id", async(req ,res) =>{
  let {id} = req.params;
 const Listing = await listing.findById(id);
  res.render("listings/show.ejs",{Listing});
})

//create route
app.post("/listings", async(req,res) =>{
   const newListing =   new listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
})

// edit route

app.get("/listings/:id/edit", async(req, res) =>{
  let {id} = req.params;
 const Listing = await listing.findById(id);
 res.render("listings/edit.ejs" ,{Listing})
})

//update route
app.put("/listings/:id", async(req, res) =>{
  let {id} = req.params;
     await listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`)
})

//delete route
app.delete("/listings/:id", async(req, res) =>{
  let {id} = req.params;
  let deletedListing = await listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})


// app.get("/testtListing" ,async(req,res) =>{
//   let sampleListing = new listing({
//     title:"my Home",
//     description:"By the beach",
//     image:{
//       filename:"hi",
//       url:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     },
//     price:1200,
//     location:"calangute, goa",
//     country:"India"
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successfull..");
  
// })


app.listen(8080,()=>{
    console.log("server is listening on port:8080");
});