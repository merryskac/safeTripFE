import { Router } from "express"
import { createNewSession, tokenCheck } from "../controllers/user.js"

const userRoute = Router()

userRoute.post('/', createNewSession)
userRoute.post('/checkToken', tokenCheck)

export default userRoute