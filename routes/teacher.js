const express=require('express')
const router=express.Router();
const studentmodel = require('../stddb');
module.exports=router

router.get('/login',async (req,res)=>{
    res.render('loginteacher');
})

router.get('/',async (req,res)=>{
    //const student = new studentmodel({ name: 'fluffy',email:'wecexac845@weishu8.com' });
    let data=await studentmodel.find();
    res.render('teacherpg1',{data:data});
})

router.get('/addstudent',async (req,res)=>{
    // //const student = new studentmodel({ name: 'fluffy',email:'wecexac845@weishu8.com' });
    // let data=await studentmodel.find();
    res.render('addstudent');
})


router.post('/',async(req,res)=>{
    console.log(req.body)
    let data=new studentmodel({
        name:req.body.name,
        email:req.body.email,
        attendence:req.body.attendence
    })
try{
    art = await data.save()
    res.redirect('/teacher');
}
    catch(err){
console.log(err);
    }
})
