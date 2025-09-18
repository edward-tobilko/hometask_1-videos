import { Request, Response, Router } from 'express';

import { db } from '../../db/videos.db';

export const videosRouter = Router({});

videosRouter.get('', (req: Request, res: Response) => {
  res.status(200).send(db.videos);
});
