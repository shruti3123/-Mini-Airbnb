const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require ("../models/listing.js"); 


const mongoUrl ="mongodb://127.0.0.1:27017/wanderlust";
main().then(() =>{
 console.log("connection to DB")
}).catch((err) =>{
    console.log(err)
});
async function main() {
    await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  await listing.deleteMany({});
  await listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();