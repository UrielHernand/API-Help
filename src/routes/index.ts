import { Application } from "express";
import userNetwork from "../network/users";

import Routes from '../utils/constants/routes.json';

function routes(app: Application) {
 app.use( Routes.usersV1 , userNetwork);
}
export default routes;
