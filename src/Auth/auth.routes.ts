import {Hono} from "hono"
import * as authControllers from "../Auth/auth.controller.js"


const authRoutes = new Hono()

// route register and login user


authRoutes.post('auth/register', authControllers.registerUser)

authRoutes.post('auth/login', authControllers.loginUser)

export default authRoutes;