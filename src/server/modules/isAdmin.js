import jwt from 'jsonwebtoken';

import { Users } from '../database/models/index';


export default async function isAdmin (headers) {
  try {
    const privateKey = process.env.PRIVATE_JWT_KEY; 
    const token = headers['x-access-token'];
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded);

    const user = await Users.findOne({
      where: {
        email: decoded.email
      }
    }).then(user => user);
    
    if(user.role == 'admin'){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    return false;
  }
}
