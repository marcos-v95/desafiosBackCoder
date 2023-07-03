import { Router } from "express";
import passport from "passport";
import { authorization } from "../utils/utils.js";

// Controllers
import {
  userRegister,
  userLogin,
  userLoginGithub,
  githubCallback,
  userCurrent,
  userMock,
  recoveryPassword,
  resetPassword,
  userChangeRole
} from "../controllers/users.controller.js"

const router = Router();

router.get('/mockingUser', userMock)

router.post('/register', passport.authenticate('register', { session: false }), userRegister)

router.post('/login', passport.authenticate('login', { session: false }), userLogin)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userLoginGithub)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), githubCallback)

router.get('/current', passport.authenticate('jwt', { session: false }), userCurrent)

router.put('/recoveryPassword', recoveryPassword)

router.put('/resetPassword/:token', resetPassword)

router.post('/premium/:uid', passport.authenticate('jwt', { session: false }), authorization(['admin']), userChangeRole)

export default router 