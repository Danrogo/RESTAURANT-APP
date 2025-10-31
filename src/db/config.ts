// import sql from 'mssql';
// import dotenv from 'dotenv';
// import {assert} from 'console';

// dotenv.config(); // Load environment variables from .env file

// const { SQL_USER, SQL_PASSWORD, SQL_SERVER, SQL_DB, SQL_PORT } = process.env;

// assert(SQL_USER, 'SQL_USER is not defined');
// assert(SQL_PASSWORD, 'SQL_PASSWORD is not defined');
// assert(SQL_SERVER, 'SQL_SERVER is not defined');
// assert(SQL_DB, 'SQL_DB is not defined');
// assert(SQL_PORT, 'SQL_PORT is not defined');

// export const dbConfig: config = { 
//         port: Number(SQL_PORT) || 1433,
//         user: SQL_USER ,
//         password: SQL_PASSWORD ,
//         server: SQL_SERVER ,
//         database: SQL_DB ,
//         connectionTimeout: 15000,
//         requestTimeout: 15000,
//         pool: {
//             max: 10,
//             min: 0,
//             idleTimeoutMillis: 30000
//         },
//         options: {
//             encrypt: false,
//             trustServerCertificate: true,
//             enableArithAbort: true,
//         }
        
//     };

// //Create a connection pool - a cache of database connections maintained so that the connections can be reused when future requests to the database are required.

// let globalPool: sql.ConnectionPool | null = null;

// const initDatabaseConnection = async () => {
//     // Return existing connection if already established
//     if (globalPool && globalPool.connected) {
//         console.log('Using existing database connection');
//         return globalPool;
//     }

//     try {
//         globalPool = await sql.connect(Config.sqlconfig); // Establishes a new connection pool using the provided configuration
//         console.log('Connected to MSSQL Database');
//         return globalPool; // Returns the connected pool for executing queries
//     } catch (error) {
//         console.error('Database Connection Failed! ', error);
//         throw error;
//     }
// };

// // Export function to get the current database pool
// export const getDbPool = (): sql.ConnectionPool => {
//     if (!globalPool || !globalPool.connected) {
//         throw new Error('Database not connected. Call initDatabaseConnection() first.');
//     }
//     return globalPool;
// };

// export default initDatabaseConnection; // Export the function to initialize the database connection 


import sql from 'mssql';
import dotenv from 'dotenv';
import { assert } from 'console';

dotenv.config(); // Load environment variables

const { SQL_USER, SQL_PASSWORD, SQL_SERVER, SQL_DB, SQL_PORT } = process.env;

assert(SQL_USER, 'SQL_USER is not defined');
assert(SQL_PASSWORD, 'SQL_PASSWORD is not defined');
assert(SQL_SERVER, 'SQL_SERVER is not defined');
assert(SQL_DB, 'SQL_DB is not defined');
assert(SQL_PORT, 'SQL_PORT is not defined');


export const dbConfig = { 
    port: Number(SQL_PORT) || 1433,
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DB,
    connectionTimeout: 15000,
    requestTimeout: 15000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
    }
};

let globalPool: sql.ConnectionPool | null = null;

// ✅ Fix: use dbConfig instead of Config.sqlconfig
const initDatabaseConnection = async () => {
    if (globalPool && globalPool.connected) {
        console.log('Using existing database connection');
        return globalPool;
    }

    try {
        globalPool = await sql.connect(dbConfig);
        console.log(' Connected to MSSQL Database');
        return globalPool;
    } catch (error) {
        console.error('❌ Database Connection Failed!', error);
        throw error;
    }
};

export const getDbPool = (): sql.ConnectionPool => {
    if (!globalPool || !globalPool.connected) {
        throw new Error('Database not connected. Call initDatabaseConnection() first.');
    }
    return globalPool;
};

export default initDatabaseConnection;

