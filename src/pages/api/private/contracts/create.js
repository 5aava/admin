import { logger } from '../../../../server/modules/logger.js';
import isAuth from '../../../../server/modules/isAuth.js';
import config from '../../../../server/config/config.server.js';
import { createContract } from '../../../../server/services/Contracts/contractsService.js';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";


export default async function create(req, res) {
  dayjs.extend(customParseFormat);

  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);

  if(!isAuth(req.headers)){
    res.status(403).json({ auth: false, error: '403 Forbidden' })
  }

  const date = dayjs(req.body.releaseDate, 'DD.MM.YYYY').add(9, 'hour');
  // console.log(date);

  const values = {
    sku: req.body.sku,
    contractorId: req.body.contractorId,
    licensorId: req.body.licensorId,
    trackId: req.body.trackId,
    date: date,
    // =======================
    contractors: JSON.parse(req.body.contractors),
    tax: req.body.tax,
    isrc: req.body.isrc,
    upc: req.body.upc,
    link: req.body.link,
    moderated: 1
  };

  const data = await createContract(values);

  if(data == 'dublicate'){
    config.sendError(res, 409, data);
  }

  config.sendOk(res, data);
}
