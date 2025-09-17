import express, { Express } from 'express';

import { testingRouter } from './videos/routers/testing.router';
import { videosRouter } from './videos/routers/videos.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use('/hometask_01/api', videosRouter);
  app.use('/hometask_01/api/testing', testingRouter);

  return app;
};
