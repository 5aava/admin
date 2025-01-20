import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { getTracks } from '../../../../server/services/Tracks/tracksService.js';


export default async function all(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }
  
  const contractorId = req.body.contractorId;
  const data = await getTracks(contractorId);
  config.sendOk(res, data);
}
