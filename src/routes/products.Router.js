import { Router } from "express";
import passport from "passport"
import { authorization } from "../utils/utils.js";

// Controllers
import {
  getProducts,
  generateMock,
  getProductbyID,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";


const router = Router();

router.get('/', getProducts)

router.get('/mockingproducts', generateMock)

router.get('/:pid', getProductbyID)

router.post('/', passport.authenticate('jwt', { session: false }), authorization(['admin', 'premium']), createProduct)

router.put('/:pid', passport.authenticate('jwt', { session: false }), authorization('admin'), updateProduct)

router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorization(['admin', 'premium']), deleteProduct)


export default router