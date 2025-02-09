import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { updateIncome } from '../../../../server/services/Incomes/incomesService.js';


export default async function update(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const q1 = req.body.q1 ? +req.body.q1 : 0;
  const q2 = req.body.q2 ? +req.body.q2 : 0; 
  const q3 = req.body.q3 ? +req.body.q3 : 0; 
  const q4 = req.body.q4 ? +req.body.q4 : 0; 
  const total = q1 + q2 + q3 + q4;

  const values = {
    contractorId: req.body.contractorId,
    trackId: req.body.trackId, 
    year: req.body.year, 
    q1: q1, 
    q2: q2, 
    q3: q3, 
    q4: q4,
    total: total,
    comment: req.body.comment,
  };

  const data = await updateIncome(req.body.id, values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }
  
  config.sendOk(res, data);
}
