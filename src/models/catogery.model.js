const mongoose = require("mongoose");

const catogerySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength: 50,
    },
    parentCatogery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'catogeries',
    },
    level:{
        type:Number,
        required:true,
    },

})
const Catogery = mongoose.models.Catogery || mongoose.model('Catogery', catogerySchema, 'catogeries');

module.exports = Catogery;