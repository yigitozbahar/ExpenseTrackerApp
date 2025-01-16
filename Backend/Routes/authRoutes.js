const router = require('express').Router()
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUser,
    updateUser 
} = require('../controllers/authController')
const authMiddleware = require('../Middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getuser', authMiddleware, getUser)
router.put('/updateuser', authMiddleware, updateUser)

module.exports = router 