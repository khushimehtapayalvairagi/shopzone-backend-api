const Catogery = require('../models/catogery.model.js')
const Product = require('../models/product.model.js')
async function createProduct(reqData){
    let topLevel = await Catogery.findOne({name:reqData.topLevelCatogery});
    if(!topLevel){
        topLevel =new Catogery({
            name:reqData.topLevelCatogery,
            level:1
        })
         await topLevel.save();
    }

    let secondLevel=await Catogery.findOne({
        name:reqData.secondLevelCatogery,
        parentCatogery:topLevel._id,
    })
    if(!secondLevel){
        secondLevel = new Catogery({
            name:reqData.secondLevelCatogery,
            parentCatogery:topLevel._id,
            level:2
        })
           await   secondLevel.save();

    }
    let thirdLevel = await Catogery.findOne({
        name:reqData.thirdLevelCatogery,
        parentCatogery:secondLevel._id
    })
    if(!thirdLevel){
        thirdLevel=new Catogery({
            name:reqData.thirdLevelCatogery,
            parentCatogery:secondLevel._id,
            level:3
        })
              await thirdLevel.save(); 
    }
    
      const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountPresent:reqData.discountPresent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        catogery:thirdLevel._id,



    })
    return await product.save();
}

async function deleteProduct(productId){
    const  product =await findProductById(productId);
    await Product.findByIdAndDelete(productId)
    return "product deleted successfully"

}
async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);

}
async function findProductById(id){
    const product = await Product.findById(id).populate("catogery").exec();
    if(!product){
        throw new Error("product not found with id" + id);

    }
    return product;
}
async function getAllProducts(reqQuery){
 let {
  catogery, color, sizes, minPrice, maxPrice, minDiscount, sort,
  stock, pageNumber = 1, pageSize = 10
} = reqQuery;
    let query=  Product.find().populate("catogery")
// if(catogery){
// const existCatogery = await Catogery.findOne({ name: new RegExp(`^${catogery}$`, 'i') });

//     if(existCatogery){
//         query = query.where("catogery").equals(existCatogery._id);

//     }else{
//         return {content:[],currentPage:1,totalPages:0}

//     }

// }
if (color) {
  const colorsArray = color.split(',').map(c => c.trim());
  query = query.where('color').in(colorsArray);
}

if (sizes) {
  const sizesArray = sizes.split(',').map(s => s.trim());
  query = query.where('sizes.name').in(sizesArray);
}


if(minPrice && maxPrice){
    query = query.where('discountedPrice').gt(minPrice).lte(maxPrice)
}
 if(minDiscount){
    query = query.where('discountPresent').gt(minDiscount);
 }
if (stock) {
  if (stock === "in_stock") {
    query = query.where("quantity").gt(0);
  } else if (stock === "out_of_stock") {
    query = query.where("quantity").equals(0);
  }
}

   if(sort){
     const sortDirection = sort=="price_high"?-1:1;
     query=query.sort({discountedPrice:sortDirection})
   }
   const countQuery = query.clone();
const totalProducts = await countQuery.countDocuments();


  if (pageSize !== 'all') {
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(Number(pageSize));
  }



   const products = await query.exec();
  const totalPages = pageSize === 'all' ? 1 : Math.ceil(totalProducts / pageSize);
   return {content:products,currentPage:pageNumber,totalPages
    
}
}
//admin
async function createMultipleProduct(products){
    for(let product of products){
        await  createProduct(product);
    }
}
module.exports ={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct

}

