const Address = require("../models/address.model.js");
const Order = require("../models/order.model");
const cartService = require("../services/cart.service.js")
const User = require("../models/user.model.js");
const OrderItem = require("../models/orderItem.model.js");
async function createOrder(user,shipAddress){
    let address;
    if(shipAddress._id){
let existAddress = await Address.findById(shipAddress._id);
address = existAddress;
    }
    else{
        address = new Address(shipAddress);
        address.user = user;
        await address.save();

      const fullUser = await User.findById(user._id);

if (!Array.isArray(fullUser.address)) {
  fullUser.address = [];
}

fullUser.address.push(address._id);
await fullUser.save();
    }
    const cart = await cartService.findUserCart(user._id);
   
    const orderItemsArray =[];

    for (const item of cart.cartItems){
      if (!item.product) {
      console.warn(`Skipping cart item with ID ${item._id} due to missing product reference.`);
    continue;
  }
        const  newOrderItem = new OrderItem({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice
        })
        const createdOrderItem = await  newOrderItem.save()
     orderItemsArray.push(createdOrderItem._id)


    }
    const createdOrder = new Order({
        user,
          orderItems: orderItemsArray,
        totalPrice:cart.totalPrice,
totalDiscountedPrice: cart.totalDiscountedPrice,

        discount:cart.discount,
        totalItem:cart.totalItem,
        shippingAddress:address,
         orderDate: Date.now()
    })
    const savedOrder = await createdOrder.save();
    return savedOrder;
}
//admin
  async function placeOrders(orderId){
     const order = await findOrderById(orderId);

      
      order.orderStatus ='PLACED';
      order.paymentDetails.status ="COMPLETED"
      return await order.save();
  }
   async function confirmedOrders(orderId){
     const order = await findOrderById(orderId);

      
      order.orderStatus ='confimred';
      return await order.save();
  }
    async function shipOrders(orderId){
     const order = await findOrderById(orderId);

      
      order.orderStatus ='shipped';
      return await order.save();
  }
    async function deliverOrders(orderId){
   const order = await findOrderById(orderId);

      
      order.orderStatus ='delivered';
      return await order.save();
  }
    async function cancelledOrders(orderId){
   const order = await findOrderById(orderId);

      
      order.orderStatus ='CANCELLED';
      return await order.save();
  }
async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
}



  async function userOrderHistory(userId){
    try {
        const orders = await Order.find({user:userId,orderStatus:'PLACED'})
        .populate({path:'orderItems',populate:{path:"product"}}).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
  }
  async function getAllOrders(){
      return await Order.find()
        .populate({path:'orderItems',populate:{path:"product"}}).lean()

  }
async function deleteOrders(orderId) {
  const order = await findOrderById(orderId);

  await Order.findByIdAndDelete(order._id);
}

  module.exports={
    createOrder,
    placeOrders,
    confirmedOrders,
    shipOrders,
    deliverOrders,
    cancelledOrders,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrders
  }

  
  