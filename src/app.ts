import express, { Express, Request, Response } from 'express';

import { testingRouter } from './videos/routers/testing.router';
import { videosRouter } from './videos/routers/videos.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('hello world!!!');
  });

  app.use('/testing', testingRouter);
  app.use('/videos', videosRouter);

  return app;
};
