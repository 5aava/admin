const config = require('../config');

require('dotenv').config();


const login = (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const servLogin = 'demo'; //process.env.ADMIN_SERVER_USERNAME;
  const servPassw = 'demo'; //process.env.ADMIN_SERVER_PASSWORD;

  if (username === servLogin) {
    if (password === servPassw) {

      const obj = {
        user: 'Admin',
      };

      return config.sendOk(res, obj);
    }
  }

  return config.sendError(res, 403);
}


module.exports = login;

