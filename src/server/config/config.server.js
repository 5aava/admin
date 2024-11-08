import dotenv from 'dotenv';

dotenv.config();
process.setMaxListeners(0);

const config = {
  env: process.env.ENV,
  platformKey: process.env.PLATFORM_KEY,
  app: {
    dblimit: 24,
  },
  logs: {
    type: process.env.LOGS_TYPE,
    path: process.env.LOGS_PATH,
  },
  validation: {
    password: { lenght: { min: 6, max: 32 } },
    type: { lenght: { min: 5, max: 32 } },
    name: { lenght: { min: 2, max: 32 } },
  },
  server: {
    protocol: process.env.SERVER_PROTOCOL,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    domain: process.env.SERVER_DOMAIN,
  },
  sendError: (res, status, data) => {
    const errors = {
      200: '200: Is OK, but something went wrong',
      401: '401: Authorization failed. Incorrect request data',
      403: '403: Forbidden. Incorrect request data',
      404: '404: Not found. Incorrect request data',
      409: '409: Conflict. Dublicate request data',
      500: '500: Internal server error',
    };
    return res.status(status).json({
      status: 'error',
      error: errors[status],
      data: data,
    });
  },
  sendOk: (res, data) => {
    return res.status(200).json({
      status: 'ok',
      data: data,
    });
  },
};

export default config;
