import mysql from 'mysql2/promise';
import 'dotenv/config'

const connection =  mysql.createConnection({
    host: process.env.CHAT_AI_DB_HOST ,
    user: process.env.CHAT_AI_DB_USER ,
    database: process.env.CHAT_AI_DB_NAME ,
    password: process.env.CHAT_AI_DB_PASSWORD ,
    port: Number(process.env.CHAT_AI_DB_PORT) || 3306,
    waitForConnections: true,
});
export default connection;

