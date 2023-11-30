 
 import {getUsersUtils} from "../../services/serviceLocator/composer"
 import { GetUserRegister, NewUserRegister, UpdateUserRegister, newUserFields } from "../../interfaces";


 function getUserByEmail(email: string):Promise<GetUserRegister| string>{
    const userUtils =  getUsersUtils();
   
    return userUtils.getUserByEmail(email);

}
function newUser(newUser:  NewUserRegister ) :Promise<any>
{
    

    const userUtils =  getUsersUtils();
    return userUtils.newUser(newUser);

}
function getUsers():Promise<any>{
    const userUtils =  getUsersUtils();
    return userUtils.getUsers();
}

function updateUser(updateUser : UpdateUserRegister ):Promise<any>{
    const userUtils =  getUsersUtils();
    return userUtils.updateUser(updateUser);
   
}

export default {getUserByEmail, newUser, getUsers, updateUser}