const orderService =require("../services/order.service.js");

const createOrder =async(req,res)=>{
 const user = req.user;
    try {
         let createdOrder = await orderService.createOrder(user,req.body);
         res.status(201).send(createdOrder)


    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
const findOrderById =async(req,res)=>{
 const user = req.user;
    try {
         let createdOrder = await orderService.findOrderById(req.params.id);
         res.status(201).send(createdOrder)


    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
const OrderHistory =async(req,res)=>{
 const user = req.user;
    try {
         let createdOrder = await orderService.userOrderHistory(user._id);
         res.status(201).send(createdOrder)


    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
module.exports={
    createOrder,
    findOrderById,
    OrderHistory

}