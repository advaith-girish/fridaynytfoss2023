const express=require('express')
const router=express.Router();
const studentmodel = require('../stddb');

router.get('/login',async (req,res)=>{
    res.render('loginstudent');
})
module.exports=router


