import { Connection} from "mysql2";
//importa cripto

import CryptoJS from "crypto-js";


/* import redis from "../../services/redis/index"; */
import { GetUserRegister, NewUserRegister, UpdateUserRegister, newUserFields } from "../../interfaces";
export class UsersUtils {

    private database: Connection;

    constructor(database: Connection) {
   
        this.database = database;
        console.log("Api en constructor de UsersUtils" );
    } 

    public async getUserByEmail(email: string): Promise<GetUserRegister | string> {

      /*   const existCache = await redis
        if(existCache){
            return JSON.parse(existCache);
        }
 */
        //validar que esto este bien
        console.log("email", email);
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        const [rows] = await this.database.promise().query(query);

        if (Array.isArray(rows) && rows.length === 0) {
            return "user not found";
        }
        
        //establecer un tiempo de expiración
/*         await redis.set("UserByGmail", JSON.stringify(rows[0]))
        const todayEnd = new Date().setHours(23,59,59,999);
        await redis.expireAt("UserByGmail", todayEnd/1000); */

        //aquí retorna el usuario encontrado en la base de datos y si no lo encuentra retorna un string

        return rows[0];
    }

    public async  getUsers() {
        const query = "SELECT * FROM users";
        const [rows] = await this.database.promise().query(query);
        return rows;
    }

    public async newUser (newUser :  NewUserRegister){

        const {
            names,
            lastNames, 
            password,
            email
        } =  newUser;

        

        const hash = CryptoJS.AES.encrypt( password, process.env.CHAT_AI_DB_SECRETKEY).toString();
        //ejecutar query preparada
        const query = `INSERT INTO users (name,lastName,email,password) VALUES (?,?,?,?)`
        const result = await    this.database.promise().query(query,[names, lastNames, email, hash]);

       return result;


    }
    public async updateUser(updateUser : UpdateUserRegister ):Promise<any>{
        const {
            names,
            lastNames, 
            password,
            email,
        
        } =  updateUser;

        //para acualizar el usuario 
        const query = `UPDATE users SET name = ?, lastName = ?, email = ?, password = ? WHERE email = ?`;
        const result = await this.database.promise().query(query,[names, lastNames, email, password, email]);
        return result;

    }
        

    

       

}