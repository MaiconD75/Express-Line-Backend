import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database';
import AppError from './app/error/AppError';

import routes from './app/routes';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.get('/', (req, res) => {
  return res.json({
    msg: `Hello World! I'm ExpressLine, your favorite fictional carrier! :D`,
  });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

export default app;
