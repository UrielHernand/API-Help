import exprerss, {request, response} from "express";
const router = exprerss.Router();

function getUserByEmail( req = request, res = response) {
   const { email } = req.params;
   res.send(`User ${email}`);

}

router.get('/', getUserByEmail);
export default router;

