import { logger } from '../../../server/modules/logger.js';
import isAuth from '../../../server/modules/isAuth.js';


export default async function main(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const data = {
    users: [
      {userId: 1, email:'test1@test.test'},
      {userId: 2, email:'test2@test.test'},
      {userId: 3, email:'test3@test.test'}
    ]
  }
  


  res.status(200).json({ data: data })
}

