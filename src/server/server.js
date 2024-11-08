import express from 'express';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import queue from 'express-queue';

import publicRoutes from './routes/public/index.js';
import privateRoutes from './routes/private/index.js';
import internalRoutes from './routes/internal/index.js';

import config from './config/config.server.js';
import authPrivateController from './controllers/auth.js';
import authInternalController from './controllers/auth.js';
import { errorHandler } from './controllers/errors.js';


// ================== swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger-output.json';
// import expressJSDocSwagger from  'express-jsdoc-swagger';

import { logger } from './modules/logger.js';


logger.info('ENV: ' + process.env.ENV);


// ==================
const protocol = config.server.protocol;
const host = config.server.host;
const port = process.env.ENV == 'test' ? 3000 : config.server.port;

// ==================
const app = express();
app.use(queue({ activeLimit: 5, queuedLimit: 100 }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    config.sendError(res, 403, 'Error: JSON syntax error');
  } else {
    next();
  }
});

// ======== timeout ==========
app.use(timeout('330s'));
app.use(haltOnTimedout);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) {next();}
}


app.use((req, res, next) => {
  // request log
  logger.info(`Request: ${req.method} ${req.url}`);
  req.query ? logger.info(req.query) : null;
  req.body ? logger.info(req.body) : null;

  // response log
  const send = res.send;
  res.send = body => {
    logger.warn(`Response: ${res.statusCode} ${body}`);
    res.send = send;
    return res.send(body);
  };
  next();
});

// ======== public ==========
app.use('/', publicRoutes);

// ======== swagger ==========
app.use('/swagger-api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======== private ==========
app.use('/api', authPrivateController, privateRoutes);

// ======== private ==========
app.use('/api/internal', authInternalController, internalRoutes);

// ======== errors ==========
app.use(errorHandler);


// ======== 404 ==========
app.get('*', function (req, res) {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    data: 'Page not found',
  });
});


// ==================
app.listen(port, host, () => {
  logger.info(`Server listening on ${protocol}://${host}:${port}`);
});

