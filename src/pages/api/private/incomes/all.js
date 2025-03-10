import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { getIncomes } from '../../../../server/services/Incomes/incomesService.js';


export default async function all(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }
    
  const contractorId = req.body.contractorId;
  const trackIdArray = req.body.trackIdArray;
  const data = await getIncomes(contractorId, trackIdArray);
  config.sendOk(res, data);
}
