import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import isAdmin from '../../../../server/modules/isAdmin.js';
import config from '../../../../server/config/config.server.js';
import { createUser } from '../../../../server/services/Users/usersServices.js';


export default async function create(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  if(!await isAdmin(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const values = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    confirm: req.body.confirm,
  };

  const data = await createUser(values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }

  config.sendOk(res, data);
}
