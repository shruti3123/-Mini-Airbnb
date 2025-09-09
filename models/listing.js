const mongoose = require("mongoose");
const Review = require("./review.js");
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
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"Review",
        }
    ]
});
 
listingScema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
   
});

const listing = mongoose.model("listing" ,listingScema);

module.exports = listing;

