
 require('../models/product.model.js')

const mongoose =require("mongoose")

const { Schema } = mongoose;
const ratingSchema=new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true,
},
rating:{
    type:Number,
    required:true,
},
createdAt:{
    type:Date,
    default:Date.now(),
}




    
});

const Rating = mongoose.model('ratings',ratingSchema);
module.exports =Rating;