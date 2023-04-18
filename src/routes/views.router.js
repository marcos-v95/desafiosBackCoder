import { Router } from "express";

import { cartsDao } from "../services/carts.service.js";
import { productsDao } from "../services/products.service.js";


const router = Router();

router.get('/products', async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let data = await productsDao.getData(1, page)
  res.render('products', data)
})

router.get('/carts/:cid', async (req, res) => {
  let data = await cartsDao.getDataByID(req.params.cid)
  res.render('carts', data)
})

router.get('/', async (req, res) => {

  res.render('home', {})
})

router.get('/register', async (req, res) => {

  res.render('register', {})
})

router.get('/login', async (req, res) => {
  let user = await req.session.user

  res.render('login', {
    exists: (user) ? true : false,
    user
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router