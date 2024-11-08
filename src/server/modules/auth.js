import jwt from 'jsonwebtoken';


export default function isAuth (headers) {
  console.log(headers);

  try {
    const privateKey = process.env.PRIVATE_JWT_KEY; 
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded) 

    return true;
  } catch(err) {
    return false;
  }
}
