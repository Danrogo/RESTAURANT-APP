import { getDbPool } from "../db/config.js";


//create new user
export const createUserService = async (first_name:string,last_name:string,email:string,phone_number:string, password:string, user_type:string): Promise<string> => {
        const db = getDbPool(); // Get existing connection
        const query = 'INSERT INTO Users1 (first_name, last_name, email, phone_number, password, user_type) OUTPUT INSERTED.* VALUES (@first_name, @last_name, @email, @phone_number, @password, @user_type)';
        const result = await db.request()
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('email', email)
            .input('phone_number', phone_number)
            .input('password', password)
            .input('user_type', user_type)
            .query(query);
        return result.rowsAffected[0] === 1 ? "User created successfully 🎊" : "Failed to create User";
}
