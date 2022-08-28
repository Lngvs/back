const express = require("express")
const router = express.Router()
const {
    register,
    login,
    picUpload,
    logout,
    allUsers,
    liked,
    disLiked,
    filter,
    list,
    autoLogin

} = require("../controllers/mainControllers")
const {
    regValid,
    logValid,
    picValid } = require("../middleware/mainMiddleware")
router.post("/register",regValid, register)
router.post("/login", logValid, login) 
router.post("/picUpload", picValid, picUpload)
router.get('/logout', logout)
router.post('/allUsers', allUsers)
router.post('/liked', liked)
router.post('/disLiked', disLiked)
router.post('/filter', filter)
router.post('/list', list)
router.get('/autoLogin', autoLogin)
module.exports = router
