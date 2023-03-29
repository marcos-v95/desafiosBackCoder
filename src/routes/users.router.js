import { Router } from "express";

// Controllers
import {
  userRegister,
  userLogin
} from "../controllers/users.controller.js"

const router= Router();


router.post('/register', userRegister)

router.post('/login', userLogin)

export default router