import { Router } from "express";
import passport from "passport"
import { authorization } from "../middlewares/utils.js";
// Controllers
import {
  getProducts,
  getProductbyID,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";


const router = Router();

router.get('/', getProducts)

router.get('/:pid', getProductbyID)

router.post('/', passport.authenticate('jwt', { session: false }), authorization('admin'), createProduct)

router.put('/:pid', passport.authenticate('jwt', { session: false }), authorization('admin'), updateProduct)

router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorization('admin'), deleteProduct)


export default router