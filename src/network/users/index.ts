import exprerss, {request, response} from "express";
import Controller from '../../controllers/users';
import passport from "passport";
import jwt from "jsonwebtoken";
const router = exprerss.Router();

 function getUserByEmail( req = request, res = response) {
      const {email}  = req.query;
      Controller.getUserByEmail( String(email))
      .then((result) => res.send(result))
      .catch((err) => {
        res.send(err);
        console.log(err);
      } 
      
      );
}
function getUsers(req = request, res = response){

  Controller.getUsers().then((result) => res.send(result))
  .catch((err) => {

    res.send(err);
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
  .then((result) => res.send(result))
  .catch((err) => {
    res.send(err);
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
        res.status(401).send(error);
        console.log(error);
      }
      if (!user && !error) {
        res.status(401).send('User not found');
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

