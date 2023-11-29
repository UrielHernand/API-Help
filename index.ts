import express from "express";
import router from './src/network'
import {initializeApp} from './src/services/serviceLocator/composer'
import './src/services/auth/index'
const app = express();
app.use(express.json());
initializeApp();

const port = 9000;


router(app);




app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});