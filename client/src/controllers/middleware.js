const apiMiddleware = value => next => action => {

  // console.log('API MIDDLEWARE: ' + value);
  return next(action);
};

export default apiMiddleware;
