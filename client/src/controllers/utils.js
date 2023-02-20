
export function notifier (status, action) {

  let type = 'error';
  if (status == true) {type = 'success';}

  let message = 'Не указали action';
  if (status == false) {message = 'Что-то пошло не так :(';}

  switch (action) {
    case 'add': message = 'Информация успешно добавлена'; break;
    case 'update': message = 'Информация успешно сохранена'; break;
    case 'delete': message = 'Информация успешно удалена'; break;
  }

  let obj = {
    isOpen: true,
    type: type,
    message: message,
  };

  return obj;
}
