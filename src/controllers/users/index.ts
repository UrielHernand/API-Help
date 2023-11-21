 
 import {getUsersUtils} from "../../services/serviceLocator/composer"
 import { newUserFields } from "../../interfaces";


 function getUserByEmail(email: string):Promise<newUserFields | string>{
    const userUtils =  getUsersUtils();
   
    return userUtils.getUserByEmail(email);

}

export default {getUserByEmail}