import { Router } from "express";
import passport from "passport";

// Controllers
import {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback
} from "../controllers/users.controller.js"

const router = Router();


router.post('/register', passport.authenticate('register'), userRegister)

router.post('/login', passport.authenticate('login'), userLogin)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userLoginGithub)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), githubCallback)

export default router 