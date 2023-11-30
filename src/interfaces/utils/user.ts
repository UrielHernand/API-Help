import { GetUserRegister, NewUserRegister, UpdateUserRegister, newUserFields } from "../index";


export interface userUtilsInterface {
    getUserByEmail(email: string): Promise<GetUserRegister| string>;
    getUsers(): Promise<any>;
    newUser(params: NewUserRegister) :  Promise<any>
    updateUser(params: UpdateUserRegister) : Promise<any>
}