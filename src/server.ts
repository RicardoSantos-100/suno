import express, { Request, Response } from 'express';
import 'express-async-errors';
import routes from '@routes/index';
import AppError from '@errors/AppError';
import Winston from './winston';

const logger = new Winston();
const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, _: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  logger.info('Server started on port 3333');
  logger.debug('this is a debug message');
  logger.info('this is a info message');
  logger.error('this is a error message');
  logger.warn('this is a warn message');
  logger.http('this is a http message');
});
