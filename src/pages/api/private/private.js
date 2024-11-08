import { logger } from '../../../server/modules/logger.js';
import isAuth from '../../../server/modules/auth.js';


export default function alive(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ error: '403 Forbidden' })
  }

  res.status(200).json({ message: 'Private I am alive' })
}
