import { GetUserRegister, NewUserRegister, newUserFields } from "../index";


export interface userUtilsInterface {
    getUserByEmail(email: string): Promise<GetUserRegister| string>;
    getUsers(): Promise<any>;
    newUser(params: NewUserRegister) :  Promise<any>
}