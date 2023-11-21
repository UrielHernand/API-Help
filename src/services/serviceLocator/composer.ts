import { Connection } from "mysql2";
import { DependencyLocator } from "./dependenciesLocator";
import database from "../database";
import { UsersUtils } from "../../utils/Users";
import { userUtilsInterface } from "../../interfaces/utils/user";

export const di = DependencyLocator.getInstance();

const types = {
    database: 'database',
    usersUtils: 'usersUtils',
};

function  getDatabase() : Connection{
   console.log("Api en getDatabase");
    return di.get(types.database);



}

export async function initializeApp() {
    try {
        init();
      
        console.log("Api inicalizada correctamente");
    } catch (error) {
        console.error("Api no inicializada correctamente: ", error);
        process.exit(1); // Exit the application on initialization failure
    }
}


function init() {
    try {
        
        di.bindFactory(types.database, () => database);

        di.bindFactory(types.usersUtils, () =>   new UsersUtils(getDatabase()) );
        console.log("Api inicalizada correctamene en init ");
    } catch (error) {
        console.error("Error during initialization:", error);
        throw error;
    }
}




export function getUsersUtils(): userUtilsInterface {

    return di.get(types.usersUtils);
}



