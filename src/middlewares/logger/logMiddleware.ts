import logger from './logger.js'; // Winston yapılandırmasını dahil edin
import { Request, Response, NextFunction } from 'express';

// Loglama middleware'i
const logMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const startTime = Date.now();

  // logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);

  const reqData = (`${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}, - User: ${req.session.username} - ip: ${req.ip}`);

  let resData = undefined;

  res.on('finish', () => {    
    const duration = Date.now() - startTime;
    resData = (`Status: ${res.statusCode} - Duration: ${duration}ms`);
    logger.info({request: reqData, response: resData});
  });

  next();
};

export default logMiddleware;