import { Request, Response, Router } from 'express';

import { db } from '../../db/videos.db';
import { Video } from '../types/video.types';
import {
  UpdateVideoInputDto,
  CreateVideoInputDto,
} from '../types/video-input-dto.types';
import { ErrorResponse } from '../types/video-errorResponse.types';
import { createErrorMessages } from '../../utils/createErrorMessages';
import {
  createVideoInputDtoValidation,
  updateVideoInputDtoValidation,
} from '../validation/video-input-dto-validation';
import { log } from 'node:console';
import { videoAssertResponseMinAge } from '../../utils/assertResponseMinAge';

export const videosRouter = Router({});

videosRouter
  .get('', (_req: Request, res: Response) => {
    res.status(200).json(db.videos);
  })

  .post(
    '',
    (
      req: Request<{}, {}, CreateVideoInputDto, {}>,
      res: Response<Video | ErrorResponse>,
    ) => {
      // * ВАЛІДАЦІЯ (звідси берем request body — це req.body)
      const errors = createVideoInputDtoValidation(req.body);

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
        ? db.videos[db.videos.length - 1].id! + 1
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
  )

  .get('/:id', (req: Request, res: Response) => {
    const currentId = parseInt(req.params.id);

    const currentVideo = db.videos.find((video) => video.id === currentId);

    if (!currentVideo) {
      return res
        .status(404)
        .json(
          createErrorMessages([{ field: 'video', message: 'Video not found' }]),
        );
    }

    log('currentVideo ->', currentVideo);

    res.status(200).json(currentVideo);
  })

  .put(
    '/:id',
    (req: Request<{ id: string }, {}, UpdateVideoInputDto>, res: Response) => {
      const updatedId = parseInt(req.params.id);

      // * робимо валідацію та відловлюємо помилки в полях, які відправить клієнт
      const errors = updateVideoInputDtoValidation(req.body);

      if (errors.length > 0) {
        return res.status(400).json(createErrorMessages(errors));
      }

      let updatedVideoIndex = -1;

      for (let index = 0; index < db.videos.length; index++) {
        const video = db.videos[index];

        if (video.id === updatedId) {
          updatedVideoIndex = index;
          break;
        }
      }

      if (updatedVideoIndex === -1) {
        return res
          .status(404)
          .json(
            createErrorMessages([{ field: 'id', message: 'Video not found' }]),
          );
      }

      // * отримуємо відео, яке хочемо відновити
      const video = db.videos[updatedVideoIndex];

      // * отримуємо поля, які надішле нам клієнт
      const {
        title,
        author,
        publicationDate,
        availableResolutions = [],
        canBeDownloaded,
        minAgeRestriction,
      } = req.body;

      // * нормалізуємо publicationDate з тіла запиту
      const normalizePublicationDate = new Date(
        typeof publicationDate === 'string'
          ? publicationDate
          : String(publicationDate),
      );

      video.title = title.trim();
      video.author = author.trim();
      video.canBeDownloaded = canBeDownloaded;
      video.minAgeRestriction = minAgeRestriction;
      video.publicationDate = normalizePublicationDate.toISOString();
      video.availableResolutions = availableResolutions;

      res.sendStatus(204);
    },
  )

  .delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const deletedVideoIndex = db.videos.findIndex((video) => video.id === id);

    log('deletedVideoIndex ->', deletedVideoIndex);

    if (deletedVideoIndex === -1) {
      return res
        .status(404)
        .json(
          createErrorMessages([{ field: 'id', message: 'Video not found' }]),
        );
    }

    db.videos.splice(deletedVideoIndex, 1);

    res.sendStatus(204);
  });
