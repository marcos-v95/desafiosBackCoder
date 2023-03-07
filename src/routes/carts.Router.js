import { Router } from "express";
// Controllers
import {
  getCart,
  createCart,
  addProductinCart
} from '../controllers/carts.controller.js'

const router= Router()

router.get('/:cid', getCart)

router.post('/', createCart)

router.post('/:cid/products/:pid', addProductinCart)

export default router