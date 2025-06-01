const express =require("express")
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller.js");
const authenticate = require("../middleware/authenticate.js");
const CartItem = require("../models/cartItem.model");
const removeCartItem = require("../services/cartItem.service");

router.put("/:id" ,authenticate,cartItemController.updateCartItem);
router.delete("/:id" , authenticate,cartItemController.removeCartItem);

module.exports = router;