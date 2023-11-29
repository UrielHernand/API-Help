import * as log4js from "log4js";

log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { 
    default: { appenders: ["cheese"], level: "error" },
    succes:  { appenders: ["cheese"], level: "info" },

 },
});



const logger = log4js.getLogger('cheese')
const succes =  log4js.getLogger('succes')


function logError (req, res, message , status, ){
  const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const path = req.originalUrl;
    const method = req.method;
    const date = new Date();

    
    const LogMessage = `${date} ${IP} ${method} ${path} ${status} `;
    logger.error(LogMessage);

    res.status(status || 500).send({message});
    
}
function logSucces (req, res, message , status, ){
  const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const path = req.originalUrl;
    const method = req.method;
    const date = new Date();
    const host = req.headers.host;
    const LogMessage = ` : ${date}  ${IP} ${method} ${path} ${status} ${host}`;
    succes.info(LogMessage);

    res.status(status || 200).send({message});
    
}

export {logError, logSucces};