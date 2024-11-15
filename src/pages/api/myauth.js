import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import { logger } from '../../server/modules/logger.js';
import {sequelize, Users} from '../../server/database/models/index.js';
sequelize.sync();


export default async function myauth(req, res) {
  const log = `${req.method} ${req.url}`;
  logger.info(log);
  // logger.info(req.body);

  // check email
  if(!req.body?.email){
    res.status(200).json({ auth: false });
  }

  // check password
  if(!req.body?.password){
    res.status(200).json({ auth: false });
  }
  
  const passwordBcrypt = await Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => user.password)
    .catch(err => res.status(200).json({ auth: false }));

    console.log(req.body);
  console.log(passwordBcrypt);

  const isAuth = await bcrypt.compare(req.body.password, passwordBcrypt);
  console.log(isAuth);

  if(isAuth){
    const privateKey = process.env.PRIVATE_JWT_KEY;
    const token = jwt.sign({ email: req.body.email }, privateKey);

    res.status(200).json({ auth: true, jwt: token })
  }

  res.status(200).json({ auth: false })
}
