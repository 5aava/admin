import { logger } from '../../server/modules/logger.js';
import jwt from 'jsonwebtoken';


export default function auth(req, res) {
  const log = `${req.method} ${req.url}`;
  logger.info(log);
  logger.info(req.body);

  if(req.body?.email && req.body?.password){
    if(req.body.email == 'alex@e-store.pro' && req.body?.password == 'alex@e-store.pro'){
      const privateKey = process.env.PRIVATE_JWT_KEY;
      const token = jwt.sign({ email: req.body.email }, privateKey);

      res.status(200).json({ auth: true, jwt: token })
    }
  }

  res.status(200).json({ auth: false })
}
