import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { getRoyalties } from '../../../../server/services/Royalties/royaltiesService.js';


export default async function all(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  console.log('========= ALL ==========')
    
  const data = await getRoyalties();
  config.sendOk(res, data);
}
