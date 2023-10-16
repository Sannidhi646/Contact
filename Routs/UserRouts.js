const express=require("express");
const { registerUser, loginUser, currentUser } = require("../Controller/UserController");
const { validateToken } = require("../middlewarehandler/validateToken");
const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)
module.exports = router;