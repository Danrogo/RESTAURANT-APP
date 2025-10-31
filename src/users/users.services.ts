import { type  Context } from "hono";
import { getDbPool } from "../db/config.js"

interface UserResponse {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
}

//get all users
export const getAllUsersService = async (): Promise<UserResponse[] > => {

        const db = getDbPool(); // Get existing connection instead of creating new one
        const result = await db.request().query('SELECT * FROM Users1');
        // console.log("🚀 ~ getAllUsers ~ result:", result)
        return result.recordset;
}

//get user by user_id
export const getUserByIdService = async (user_id: string): Promise<UserResponse | null> => {
        const db = getDbPool(); // Get existing connection
        const result = await db.request()
            .input('user_id', user_id)
            .query('SELECT * FROM Users1 WHERE user_id = @user_id');
        return result.recordset[0] || null;
}

//get user by email
export const getUserByEmailService = async (email: string): Promise<UserResponse | null> => {
    const db = getDbPool(); // Get existing connection
    const result = await db.request()
        .input('email', email)
        .query('SELECT * FROM Users1 WHERE email = @email');
    return result.recordset[0] || null;
}


//update user by user_id
export const updateUserService = async (user_id:string, first_name:string,last_name:string,email:string,phone_number:string): Promise<UserResponse | null> => {
        const  db = getDbPool();
        const result = await db.request()
            .input('user_id', user_id)
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('phone_number', phone_number)
            .input('email', email)
            .query('UPDATE Users1 SET first_name = @first_name, last_name = @last_name, phone_number = @phone_number, email = @email OUTPUT INSERTED.* WHERE user_id = @user_id');
        return result.recordset[0] || null;
}

//delete user by user_id
export const deleteUserService = async (user_id:string): Promise<UserResponse | null> => {
        const db = getDbPool(); // Get existing connection
        const result = await db.request()
            .input('user_id', user_id)
            .query('DELETE FROM Users1 OUTPUT DELETED.* WHERE user_id = @user_id');
        return result.recordset[0] || null;
}
