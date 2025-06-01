const mongoose =require("mongoose")

const AddressSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        require:true
    } ,
      lastName:{
        type:String,
        require:true
    } ,
      streetAddress:{
        type:String,
        require:true
    } ,
      city:{
        type:String,
        require:true
    } ,
      state:{
        type:String,
        require:true
    } ,
      zipcode:{
        type:Number,
        require:true
    } ,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
      mobile:{
        type:String,
        require:true
    } ,
})
const Address = mongoose.model("Address",AddressSchema)

module.exports=Address;
