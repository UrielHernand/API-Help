import exprerss, {request, response} from "express";
import Controller from '../../controllers/users';
import passport from "passport";
import jwt from "jsonwebtoken";
import {logError, logSucces} from "../../services/Logs/index";
import { log } from "console";
const router = exprerss.Router();

 function getUserByEmail( req = request, res = response) {
      const {email}  = req.query;
      Controller.getUserByEmail( String(email))
      .then((result) =>logSucces(req, res, result, 200) )
      .catch((err) => {
        logError(req, res, err, 500);
        console.log(err);
      }   
      
      );
}
function getUsers(req = request, res = response){

  Controller.getUsers()
  .then((result) => logSucces(req, res, result, 200))
  .catch((err) => {

    logError(req, res, err, 500);
    console.log(err);
   }    
 ); 
}


function newUser(req = request, res = response){
  const { names , lastNames, email, password } = req.body;

  const newUser = {
    names,
    lastNames,
    email,
    password
  }

  Controller.newUser(newUser)
  .then((result) => logSucces(req, res, result, 200))
  .catch((err) => {
    logError(req, res, err, 500);
    console.log(err);
  } 
  
  );
  
}

function login (req = request, res = response){

  // valida que el usuario exista y que la contraseña sea correcta
  passport.authenticate(
    'signup',
    async (error, user) => {
      if (error ) {
     
        logError(req, res, error, 500);
        
      }
      if (!user && !error) {
       const message = "Usuario o contraseña incorrectos";
       logError(req, res, message, 401);
      }
      if (user && !error) {
        const token = jwt.sign(user, process.env.CHAT_AI_DB_SECRETKEY);

        res.status(200).send({ token });

      }
      
    }) (req, res);



  
} 

router.get('/', getUserByEmail);
router.post('/', newUser);
router.get('/all', getUsers);
router.post('/login', login)
export default router;

