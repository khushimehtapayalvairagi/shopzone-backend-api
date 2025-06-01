const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const CartItem = require("../models/cartItem.model.js");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

const findUserCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return { cartItems: [], totalPrice: 0, totalItem: 0, discount: 0 };
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cartItems) {
      totalPrice+=cartItem.price;
      totalDiscountedPrice+=cartItem.discountedPrice;
      totalItem+=cartItem.quantity;
    }

    cart.totalPrice=totalPrice;
    cart.totalItem=totalItem;
    cart.discount=totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCartItem = async (userId, productId, size) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: size,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem._id);
      await cart.save();

      return "Item added to cart";
    } else {
      return "Item already in cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCart, findUserCart, addCartItem };
