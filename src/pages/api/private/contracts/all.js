import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { getContracts } from '../../../../server/services/Contracts/contractsService.js';


export default async function all(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' });
  }

  const isModerated = req.query.isModerated == '1' ? true : false;
    
  const data = await getContracts(isModerated);
  config.sendOk(res, data);
}
