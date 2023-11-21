import { newUserFields } from "../index";


export interface userUtilsInterface {
    getUserByEmail(email: string): Promise<newUserFields | string>;
    getUsers(): Promise<any>;

}