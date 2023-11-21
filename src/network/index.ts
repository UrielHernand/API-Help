import { Application } from 'express';
import UsersNetwork from './users';
import Routes from '../utils/constants/routes.json';
//
function routes(server : Application){

    server.use(Routes.usersV1, UsersNetwork);
    console.log('Routes loaded');

}

export default routes;