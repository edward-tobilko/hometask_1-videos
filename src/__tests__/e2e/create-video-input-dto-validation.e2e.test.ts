import express from 'express';
import request from 'supertest';

import { setupApp } from '../../app';
import { Video } from '../../videos/types/video.types';

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

describe('Create video API body validation check', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete(`/testing/all-data`).expect(204);
  });

  it('should not create video if the inputModel has incorrect values (status - 400)', async () => {
    const invalidDataSet1 = await request(app)
      .post(`/videos`)
      .send({
        ...newTestCreateVideo,
        title: 'maxLength'.repeat(41),
        author: 'maxLength'.repeat(21),
        availableResolutions: ['P999'],
      })
      .expect(400);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);
  });

  // * якщо Jest «висить» після тестів:
  afterAll(async () => {
    await request(app).delete(`/testing/all-data`).expect(204);
  });
});
