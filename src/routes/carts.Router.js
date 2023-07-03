import { Router } from "express";
import passport from "passport";
import { authorization } from "../utils/utils.js";

// Controllers
import {
  getCart,
  createCart,
  addProductinCart,
  deleteProductinCart,
  cleanCart,
  updateCart,
  updateProductinCart,
  checkOut
} from '../controllers/carts.controller.js'

const router = Router()

router.get('/:cid', getCart)

router.post('/', createCart)

router.post('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), authorization(['user', 'premium']), addProductinCart)

router.delete('/:cid/products/:pid', deleteProductinCart)

router.delete('/:cid', cleanCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', updateProductinCart)

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), authorization(['user']), checkOut)

export default router