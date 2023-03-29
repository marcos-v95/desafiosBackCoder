import { Router } from "express";

import { cartsDao } from "../services/carts.service.js";
import { productsDao } from "../services/products.service.js";


const router=Router();

router.get('/products',async (req,res)=>{
  let page= parseInt(req.query.page) || 1;
  let data= await productsDao.getData(1,page)
  res.render('products',data)
})

router.get('/carts/:cid', async (req,res)=>{
  let data= await cartsDao.getDataByID(req.params.cid)
  res.render('carts',data)
})

router.get('/register', async (req,res)=>{
  
  res.render('register',{})
})

router.get('/', async (req,res)=>{
  
  res.render('login',{})
})

router.get('/login', async (req,res)=>{
  let user ={
    name:req.session.name,
    last:req.session.last,
    age:req.session.age,
    email:req.session.email,
  }
  
  res.render('user', {
    exists:(user.email!==undefined||null)?true:false, 
    user
  })
})
router.get('/logout', async (req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

export default router