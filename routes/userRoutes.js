const express = require("express");
const { registerController, loginController } = require("../controllers/userController");



//router object
const router = express.Router()

//routes Register type post
router.post("/register",registerController)


//routes Login type Post
router.post("/login",loginController)


//export
module.exports = router