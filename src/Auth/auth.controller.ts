import type { Context } from "hono"
import bcrypt from "bcryptjs";
import * as authServices from "../Auth/auth.services.js";
import { getUserByEmailService } from "../users/users.services.js";
import dotenv from "dotenv";

dotenv.config();

interface LoginRequest{
    email:string;
    password:string;
}

export const registerUser = async (c: Context) => {
    const body = await c.req.json() as {first_name:string,last_name:string,email:string,phone_number:string, password:string, user_type:string};
   
    try {
        //create user email if not exists
        const emailCheck = await getUserByEmailService(body.email);
        if (emailCheck !== null) {
            return c.json({ error: 'Email already exists' }, 400);
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(body.password, salt);
        // console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword);
        body.password = hashedPassword;
         //register a user
      const newUser = await authServices.createUserService(body.first_name, body.last_name, body.email, body.phone_number, body.password, body.user_type);
      if (newUser === "Failed to create User"){
        return c.json({ error:newUser}, 501);
        }
        return c.json({ error: 'Failed to create user' }, 500);
    } catch (error) {
        console.error('Error creating user:', error);
        return c.json({ error: 'Failed to create user' }, 500);
    }
};

//logging an existing user
export const loginUser = async (c: Context) => {
    const body = await c.req.json() as LoginRequest;

try{

    //check if user exists
    const existingUser = await getUserByEmailService(body.email);
    if (existingUser === null){
        return c.json({ error: 'Invalid email or password' }, 401);
    }

    //compare and contast the password
   const isPasswordValid = bcrypt.compareSync(body.password, existingUser.password);
     
   if (!isPasswordValid){
    return c.json({ error: 'Invalid email or password' }, 401);
   }


// generating ajwt token


   // generating a token
   return c.json({
    success: true,
    message: 'Login successful',
    user: existingUser
   }, 200);
}catch(error:any){
   console.error('Error logging in user:', error);
   return c.json({ error: 'Failed to log in user' }, 500);
}
};