const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingScema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image:{
        filename: {
      type: String,
    },
    url: {
      type: String,
    },   
      },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
});

const listing = mongoose.model("listing" ,listingScema);

module.exports = listing;

