import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),    // Loglara zaman damgası ekleyin
    json()          // Logları JSON formatında tutun
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/allLogs.json' }),
    new transports.File({ filename: 'logs/error.json', level: 'error' }),
  ]
});

export default logger;