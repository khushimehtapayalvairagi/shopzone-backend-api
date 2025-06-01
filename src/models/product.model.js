const mongoose =require('mongoose');

const productSchema = new  mongoose.Schema({
    title:{
        type:String,

    },
    description:{
        type:String
    },
    price:{
        type:Number,
    },
     discountedPrice: {
      type: Number,
      required: true,
       },
    discountPresent:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
    brand:{
        type:String,
    },
    color:{
        type:String,
    },
    sizes:[{
        name:{type:String},
        quantity:{type:Number}
    }],
    imageUrl:{
        type:String,
    },
    ratings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'ratings',
        }

    ],
    reviews:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'reviews',
    }],
    numRatings:{
        type:Number,
        default:0,
    },
    catogery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Catogery',
    },
        createdAt:{
        type:Date,
        default:Date.now()
     },
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

 module.exports =Product;