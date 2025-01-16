const router = require('express').Router()
const { addCategory, getCategories, deleteCategory } = require('../Controllers/categoryController')
const authMiddleware = require('../Middleware/authMiddleware')

router.use(authMiddleware)

router.get('/get-categories', getCategories)
router.post('/add-category', addCategory)
router.delete('/delete-category/:id', deleteCategory)

module.exports = router 