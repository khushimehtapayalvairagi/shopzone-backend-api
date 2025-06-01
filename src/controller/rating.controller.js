const ratingService = require("../services/rating.service")


const createRating =async(req,res)=>{
const user = req.user;
    try {
        const review =await reviewService.createRating(req.body,user)
         return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    
}


const getAllRating =async(req,res)=>{
    const productId=req.params.productId;
const user = req.user;
    try {
        const review = await ratingService.getAllRating(productId)
         return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    
}
module.exports = 
{
    createRating,
    getAllRating
}