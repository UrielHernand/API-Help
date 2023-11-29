import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { getUsersUtils } from '../serviceLocator/composer';
import CryptoJS from 'crypto-js';

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password , done) =>{
            const userUtils = getUsersUtils();
            const user = await userUtils.getUserByEmail(email);
            if (!user){
                return done( 'User not found', false);
            }
          if(typeof user === 'object'){
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.CHAT_AI_DB_SECRETKEY).toString(CryptoJS.enc.Utf8);
   /*          console.log("decryptedPassword", decryptedPassword); */
            if (decryptedPassword !== password){
                console.log("password", password);
                return done('Incorrect password', false);
            }
            const userData = {
                email: user.email,
                names: user.names,
                lastNames: user.lastNames,
                id: user.id

               
            };
            return done(null, userData);
          }
            return done('User not found', false);
            
            
        }
    )
)