const express= require("express")
const  {ContactFormHandler}= require("../controllers/ContactController")
 const router=express.Router();
router.post("/contact",ContactFormHandler);
module.exports=router;