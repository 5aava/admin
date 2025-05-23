import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { createRoyalty } from '../../../../server/services/Royalties/royaltiesService.js';


export default async function create(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const values = {
    contractorId: req.body.contractorId,
    tracks: req.body.tracks,
  };

  const data = await createRoyalty(values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }

  config.sendOk(res, data);
}
