import { logger } from '../../../server/modules/logger.js';
import isAuth from '../../../server/modules/isAuth.js';


export default async function main(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  // await new Promise(r => setTimeout(r, 3000));
  res.status(200).json({ data: 'Private I am alive' })
}
