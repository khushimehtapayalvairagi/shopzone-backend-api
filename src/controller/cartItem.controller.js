const cartItemService = require("../services/cartItem.service.js")

const updateCartItem = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.id;

  if (!user || !cartItemId) {
    return res.status(400).send({ error: "User or Cart Item ID is missing" });
  }

  try {
    const updatedCartItem = await cartItemService.updateCartItem(user._id, cartItemId, req.body);
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};



const removeCartItem=async(req,res)=>{
      const user=  req.user;
      console.log("cart item id",req.params.id)
      try {
         await cartItemService.removeCartItem(user._id,req.params.id);
         return  res.status(200).send({message:"cart item removed successfully"});
      } catch (error) {
         return res.status(500).send({error:error.message})
      }
}

module.exports ={
    updateCartItem,removeCartItem
}
