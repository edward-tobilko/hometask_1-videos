import { Request, Response, Router } from 'express';

import { db } from '../../db/videos.db';
import { Video } from '../types/video.types';
import { VideoInputDto } from '../types/video-input-dto.types';
import { ErrorResponse } from '../types/video-errorResponse.types';
import { createErrorMessages } from '../../utils/createErrorMessages';
import { videoInputDtoValidation } from '../validation/video-input-dto-validation';
import { log } from 'node:console';
import { videoAssertResponseMinAge } from '../../utils/assertResponseMinAge';

export const videosRouter = Router({});

videosRouter
  .get('', (_req: Request, res: Response) => {
    res.status(200).json(db.videos);
  })

  .post(
    '',
    async (
      req: Request<{}, {}, VideoInputDto, {}>,
      res: Response<Video | ErrorResponse>,
    ) => {
      // * ВАЛІДАЦІЯ (звідси берем request body — це req.body)
      const errors = videoInputDtoValidation(req.body);

      if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
          const error = errors[i];
          log(`Field: ${error.field} -> message: ${error.message}`);
        }

        return res.status(400).json(createErrorMessages(errors));
      }

      // * витягуємо поля, які має заповнити та відправити нам клієнт (request)
      const { title, author, availableResolutions = [] } = req.body;

      // * СТВОРЕННЯ МОДЕЛІ ПІД 201
      const videoId = db.videos.length
        ? db.videos[db.videos.length - 1].id + 1
        : 1;
      const createDate = new Date();
      const publicationDate = new Date(createDate);

      const newVideoResponse: Video = {
        id: videoId,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createDate.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions,
      };

      // * Перевірка респонса на валідність (minAgeRestriction)
      try {
        videoAssertResponseMinAge(newVideoResponse.minAgeRestriction);
      } catch (error) {
        return res.status(500).json(createErrorMessages(errors));
      }

      db.videos.push(newVideoResponse);

      // * ВІДПОВІДЬ (response) за схемою 201
      return res.status(201).json(newVideoResponse);
    },
  );
