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
  title: 'string',
  author: 'string',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: expect.any(String),
  publicationDate: expect.any(String),
  availableResolutions: [],
};

describe('Videos API', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });

  it('GET: /videos -> should return videos list', async () => {
    const video1 = { ...videoInputDto, title: 'Another video-1' };
    const video2 = { ...video1, title: 'Another video-2' };

    await request(app).post(`${BASE_URL}/videos`).send(video1).expect(201);

    await request(app).post(`${BASE_URL}/videos`).send(video2).expect(201);

    const videoListResponse = await request(app)
      .get(`${BASE_URL}/videos`)
      .expect(200);

    expect(Array.isArray(videoListResponse.body)).toBe(true);
    expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it('POST: /videos -> should create new driver, (status - 201)', async () => {
    await request(app)
      .post(`${BASE_URL}/videos`)
      .send({
        ...newTestCreateVideo,
        title: 'New test video-1',
        author: 'New test author-1',
        availableResolutions: [
          VideoAvailableResolution.P480,
          VideoAvailableResolution.P360,
        ],
      })
      .expect(201);
  });

  // * якщо Jest «висить» після тестів:
  afterAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });
});
