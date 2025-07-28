const express= require("express")
const  {ContactFormHandler}= require("../controllers/ContactController")
 const router=express.Router();
router.post("/",ContactFormHandler);
module.exports=router;
