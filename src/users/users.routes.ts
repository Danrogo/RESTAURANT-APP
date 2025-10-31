import {Hono} from 'hono'
import * as userControllers from '../users/users.controllers.js'

const userRoutes = new Hono()



// Get all users
userRoutes.get('/users', userControllers.getAllUsers)

// Get user by user_id
userRoutes.get('/users/:user_id', userControllers.getUserById)

// Update user by user_id
userRoutes.put('/users/:user_id', userControllers.updateUser)

// Delete user by user_id
userRoutes.delete('/users/:user_id', userControllers.deleteUser)

//create a new user

userRoutes.post('/users',userControllers.updateUser )



export default userRoutes