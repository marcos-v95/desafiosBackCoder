import { Router } from "express";
import messagesViews from "../controllers/messages.controller.js";


const router=Router()

router.get('/', messagesViews)

export default router