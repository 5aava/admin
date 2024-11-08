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

export const getUserAttributes = () => {
  return [
    'id',
    'name',
    'email',
    'isEmail',
    'isSubscribe',
    'referral',
  ];
};

export const fetcher = (query, url = '/api/graphql') =>
  fetch(url, {
    method: 'POST',
    headers: {
      'X-API-KEY': clientkey,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);


export const privatefFetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'X-API-KEY': clientkey,
      'X-ACCESS-TOKEN': localStorage.getItem('token') || null,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);


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

// notifier
export function notifier (snackbar, action = 'error') {

  let type, message;

  switch (action) {
    case 'toshop':              type = 'success'; message = 'Добавили в корзинку';                    break;
    case 'fromshop':            type = 'info'; message = 'Удалили из корзинки';                       break;
    case 'tofav':               type = 'success'; message = 'Добавили в избранное';                   break;
    case 'fromfav':             type = 'info'; message = 'Удалили из избранного';                     break;
    case 'delete':              type = 'info'; message = 'Информация успешно удалена';                break;
    case 'subscribe':           type = 'success'; message = 'Вы успешно сменили статус рассылки';     break;
    case 'password':            type = 'success'; message = 'Вы успешно сменили пароль';              break;
    case 'deleteacc':           type = 'success'; message = 'Вы успешно удалили свой аккаунт';        break;
    case 'deleteOrderId':       type = 'success'; message = 'Вы успешно удалили заказ';               break;
    case 'prcodeSuccess':       type = 'success'; message = 'Промокод успешно активирован';           break;
    case 'prcodeIsInvalid':     type = 'error';  message = 'Ошибка: Промокод введен не верно';                break;
    case 'prcodeOutOfDate':     type = 'error';  message = 'Ошибка: Дата активации Промокода закончилась';    break;
    case 'prcodeIsActivated':   type = 'error';  message = 'Ошибка: Промокод уже был активирован';            break;
    default:                    type = 'error';  message = 'Ошибка! Что-то пошло не так';             break;
  }

  snackbar.queue.push({
    message: message,
    key: new Date().getTime(),
  });

  let value = {
    ...snackbar,
    action: action,
    type: type,
    messageInfo: snackbar.queue.shift(),
    isOpen: true,
    time: 2000,
  };

  return value;
}

export function getEmailFromLocalStorage () {
  let decoded = jwt.decode(window.localStorage.getItem('token'), {complete: true});
  if (decoded?.payload?.email) {
    return decoded.payload.email;
  } else {
    return null;
  }
}


export function getImageUrl (imageUrl, size = null) {

  // let url = 'https://img.e-store.pro/noImage.svg';
  const server = 'https://img.e-store.pro';
  // const server = 'http://127.0.0.1:6060/images';
  let url = null;

  if (imageUrl) {
    if (size) {
      url = `${server}/products/thumb_${size}/${imageUrl}`;
    } else {
      url = `${server}/${imageUrl}`;
    }
  }

  return url;
}

// склонение слов [товар, товара, товаров]
export function declOfNum (number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

export function getMoreTextArray () {
  return shuffle([
    'дальше показывай',
    'хочу еще',
    'давай еще',
    'остались еще варианты?',
    'больше, больше товаров!',
    'покажи еще',
    'давай, детка',
    'удиви меня',
    'листаем дальше',
    'тааак...это когда-нибудь кончится?',
    'и это все? мне надо больше!',
    'еще посмотрим?',
    'еще одну страничку, и все',
    'последняя, честное слово',
    'огласите весь список, пожалуйста!',
    'помышляю о большем...',
    'жажду продолжения',
    'предлагаю не останавливаться',
    'не прочь осмотреть еще страничку',
    'есть намерение добраться до конца',
    'а еще будет?',
    'жми, будь мужиком',
  ]);
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


export function getDescription (description, style) {
  description = description.replaceAll('<a ', `<a target="_blank" rel="nofollow" class="${style}" `);
  const options = {
    replace: ({ name, children }) => {

      if (name === 'div') {
        return <span>{domToReact(children, options)}</span>;
      }
      if (name === 'span') {
        return <span>{domToReact(children, options)}</span>;
      }
      if (name === 'samp') {
        return <p>{domToReact(children, options)}</p>;
      }

    },
  };

  return typeof description == 'object' ? description.map((item, key) => {
    if (typeof item !== 'object') {
      return <span key={key}>{item}</span>;
    }
  }) :
    <span key={1} style={{fontSize:16}}>
      {htmlParse(description, options)}
    </span>;
}
