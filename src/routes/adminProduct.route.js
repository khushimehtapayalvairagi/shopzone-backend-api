const express =require("express")
const router = express.Router();


const productController = require("../controller/product.Controller.js");
const authenticate = require("../middleware/authenticate.js");

router.post("/" , productController.createProduct);
router.post("/creates" , authenticate,productController.createMultipleProduct)
router.put("/:id" , authenticate,productController.updateProduct);
router.delete("/:id" , authenticate, productController.deleteProduct);


module.exports = router