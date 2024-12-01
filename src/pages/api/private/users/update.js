import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { updateUser } from '../../../../server/services/Users/usersServices.js';


export default async function create(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const values = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };


  const data = await updateUser(req.body.id, values);
  config.sendOk(res, data);
}
