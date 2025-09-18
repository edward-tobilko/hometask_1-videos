import express from 'express';
import request from 'supertest';

import { setupApp } from '../../app';
import { videoInputDto } from '../../videos/dto/video.input-dto';

describe('Videos API', () => {
  const app = express();
  setupApp(app);

  const BASE_URL = '/hometask_01/api';

  beforeAll(async () => {
    await request(app)
      .delete(BASE_URL + '/testing/all-data')
      .expect(204);
  });

  it('GET: /videos -> should return videos list', async () => {
    const video1 = { ...videoInputDto, title: 'Another video1' };
    const video2 = { ...video1, title: 'Another video2' };

    await request(app)
      .post(BASE_URL + '/videos')
      .send(video1)
      .expect(201);

    await request(app)
      .post(BASE_URL + '/videos')
      .send(video2)
      .expect(201);

    const videoListResponse = await request(app)
      .get(BASE_URL + '/videos')
      .expect(200);

    expect(videoListResponse.body).toBeInstanceOf(Array);
    expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
  });
});
