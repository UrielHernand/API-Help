import { Connection} from "mysql2";

import redis from "../../services/redis/index";
import { newUserFields } from "../../interfaces";
export class UsersUtils {

    private database: Connection;

    constructor(database: Connection) {
   
        this.database = database;
        console.log("Api en constructor de UsersUtils" );
    } 

    public async getUserByEmail(email: string): Promise<newUserFields | string> {

        //validar que esto este bien

        console.log("email", email);


     const query = `SELECT * FROM users WHERE email = '${email}'`;
    

     const [rows] = await this.database.promise().query(query);


        if (Array.isArray(rows) && rows.length === 0) {
            return "user not found";
        }
    
 
        return rows[0];
    }

    public async  getUsers() {
        const existCache = await redis.get("allUsers");

        if (existCache) {
            return JSON.parse(existCache);
        }
        
        const [rows, fields] = await this.database.promise().query("SELECT * FROM users");
        const sendable = {
            rows,
            fields
        }

        //establecer un tiempo de expiración
        await redis.set("allUsers", JSON.stringify(sendable));
        const todayEnd = new Date().setHours(23,59,59,999);
        await redis.expireAt("allUsers", todayEnd/1000);
        return sendable;
    }

}