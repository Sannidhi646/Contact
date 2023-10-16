const express=require("express");
const router=express.Router();
const {getContacts}=require("../Controller/ContactController");
const {getContact}=require("../Controller/ContactController");
const {createContact}=require("../Controller/ContactController");
const {updatecontact}=require("../Controller/ContactController");
const {deleteContact}=require("../Controller/ContactController");
const { validateToken } = require("../middlewarehandler/validateToken");


router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updatecontact).delete(deleteContact);


module.exports=router;