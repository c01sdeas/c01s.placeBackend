import { Logger } from 'winston';

declare module './logger' { // modül adınıza göre düzenleyin
  const logger: Logger;
  export default logger;
}