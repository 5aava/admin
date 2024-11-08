import pino from 'pino';


export const logger = pino({
  transport: {
    target: 'pino-pretty',
    messageFormat: '{levelLabel} - {pid} - url:{request.url}',
    options: {
      translateTime: 'SYS:dd.mm.yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
});
