import { createErrorMessages } from './../../utils/createErrorMessages';
import express from 'express';
import request from 'supertest';

import { setupApp } from '../../app';
import { videoInputDto } from '../../videos/dto/video.input-dto';
import {
  Video,
  VideoAvailableResolution,
} from '../../videos/types/video.types';

const BASE_URL = '/hometask_01/api';

const newTestCreateVideo: Video = {
  id: expect.any(Number),
  title: 'New test video-1',
  author: 'New test author-1',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: expect.any(String),
  publicationDate: expect.any(String),
  availableResolutions: [],
};

describe('POST: /videos -> should not create if the inputModel has incorrect values, (status - 400)', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });

  it('should not create video when incorrect body passed, (status - 400)', async () => {
    const invalidDataSet1 = await request(app)
      .post(`${BASE_URL}/videos`)
      .send({
        ...newTestCreateVideo,
        title: 'T'.repeat(41),
        author: 'A'.repeat(21),
        availableResolutions: ['P999'],
      })
      .expect(400);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);
  });

  // * якщо Jest «висить» після тестів:
  afterAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });
});
