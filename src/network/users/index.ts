import exprerss, {request, response} from "express";
import Controller from '../../controllers/users';
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

router.get('/', getUserByEmail);
export default router;

