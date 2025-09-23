import { Request, Response, Router } from 'express';

import { db } from '../../db/videos.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', (_req: Request, res: Response) => {
  db.videos = [];

  res.sendStatus(204);
});
