const express = require("express")
const router = express.Router();
const { addProductValidation, deleteUserValidation, updateProductValidation } = require('../app/validation/validation')
const Category = require('../app/controllers/CategoryController')
router.post('/api/create-new-product', addProductValidation, Category.createNewProduct)
router.get('/api/get-all-product', Category.getAllProduct)
router.put('/api/update-product', updateProductValidation, Category.updateProduct)
router.delete('/api/delete/:id', deleteUserValidation, Category.deleteProduct)
router.get('/api/sort', Category.sortProduc)
module.exports = router;