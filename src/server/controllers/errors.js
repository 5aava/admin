import config from '../config/config.server';


export const errorHandler = (err, req, res, next) => {
  console.log('=========!!!!!!!!! --- Middleware Error Hadnling --- !!!!!!!!!=========');
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';


  if (config.env === 'development') {
    console.log(err.stack);
    console.log(err);
  }

  res.status(errStatus).json({
    status: 'error',
    statusCode: errStatus,
    data: errMsg,
    stack: config.env === 'development' ? err.stack : {},
  });

  next();
};
