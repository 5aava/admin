import { logger } from '../../server/modules/logger.js';

export default function alive(req, res) {
  const log = `${req.method} ${req.url} ${req.body}`;
  logger.info(log);
  res.status(200).json({ message: 'I am alive' })
}
