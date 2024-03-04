import { Express } from 'express';
import { buyController } from './controller';

export const createRouter = (app: Express) => {
  app.post('/buy', (req, res) => {
    return buyController(req, res);
  });
};
