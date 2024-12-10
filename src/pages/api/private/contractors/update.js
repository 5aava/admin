import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { updateContractor } from '../../../../server/services/Contractors/contractorsService.js'


export default async function update(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const values = {
    nickname: req.body.nickname,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    patronymic: req.body.patronymic,
  };

  const data = await updateContractor(req.body.id, values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }
  
  config.sendOk(res, data);
}
