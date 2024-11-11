import jwt from 'jsonwebtoken';
import { clientkey } from '../config/config.client';
import htmlParse, { domToReact } from 'html-react-parser';


export const getIp = req => {
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  ip = ip.replace(/^.*:/, '');

  return ip;
};

export const isValidType = type => {
  if (type === 'local') {return true;}
  if (type === 'google') {return true;}
  if (type === 'facebook') {return true;}
  return false;
};


export function countOfObject (obj) {
  let result = 0;
  for (let prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      result++; // or Object.prototype.hasOwnProperty.call(obj, prop)
    }
  }
  return result;
}

export function getEmailFromLocalStorage () {
  let decoded = jwt.decode(window.localStorage.getItem('token'), {complete: true});
  if (decoded?.payload?.email) {
    return decoded.payload.email;
  } else {
    return null;
  }
}

// склонение слов [товар, товара, товаров]
export function declOfNum (number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

function shuffle (array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

