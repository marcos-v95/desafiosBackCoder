import { Router } from "express";
import passport from "passport";

// Controllers
import {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent,
  userMock
} from "../controllers/users.controller.js"

const router = Router();

router.get('/mockingUser', userMock)

router.post('/register', passport.authenticate('register', { session: false }), userRegister)

router.post('/login', passport.authenticate('login', { session: false }), userLogin)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userLoginGithub)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), githubCallback)

router.get('/current', passport.authenticate('jwt', { session: false }), userCurrent)

export default router 