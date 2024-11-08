import config from '../config/config.server.js';

export default function authController (req, res, next) {
  const token = req.headers['x-api-key'];

  if (!token) {return config.sendError(res, 401);}
  if (token == config.platformKey) {
    next();
  } else {
    return config.sendError(res, 401);
  }
}
