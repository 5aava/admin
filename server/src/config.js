'use strict';

require('dotenv').config();


module.exports = {
  clientkey: '',
  adminkey: process.env.ADMIN_SERVER_TOKEN,
  server: {
    protocol: process.env.SERVER_PROTOCOL,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
  sendError: (res, status) => {
    let errors = {
      401: '401: Authorization failed. Incorrect request data',
      403: '403: Forbinden. Incorrect request data',
      404: '404: Not found. Incorrect request data',
      409: '409: Conflict. Dublicate request data',
      500: '500: Internal server error',
    };
    return res.status(status).json({
      status: 'error',
      data: errors[status],
    });
  },
  sendOk: (res, data) => {
    return res.status(200).json({
      status: 'ok',
      data: data,
    });
  },
};
