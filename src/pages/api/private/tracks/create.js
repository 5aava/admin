import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { createTrack } from '../../../../server/services/Tracks/tracksService.js'


export default async function create(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const values = {
    id: req.body.id,
    name: req.body.name,
    contractorId: req.body.contractorId
  };

  console.log(values);

  const data = await createTrack(values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }

  config.sendOk(res, data);
}
