import pinoLogger from 'pino';

const logConfig = {
  name: '@couch-mint/obs-api-logger',
  level: 'info',
  base: undefined,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
};

export const pino = pinoLogger(logConfig);
