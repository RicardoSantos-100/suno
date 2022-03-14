import winston from 'winston';

class Winston {
  private logger: winston.Logger;

  constructor() {
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };

    const levelLog = () => {
      const env = process.env.NODE_ENV || 'development';
      const isDevelopment = env === 'development';
      return isDevelopment ? 'debug' : 'warn';
    };

    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'blue',
      log: 'gray',
    };

    winston.addColors(colors);

    const format = winston.format.combine(
      winston.format.label({ label: 'api' }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize({ all: true }),
      winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      }),
    );

    const transports = [new winston.transports.Console()];

    this.logger = winston.createLogger({
      level: levelLog(),
      levels,
      format,
      transports,
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public http(message: string): void {
    this.logger.http(message);
  }
}

export default Winston;
