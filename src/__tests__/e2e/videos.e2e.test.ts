import express from 'express';
import request from 'supertest';
import { log } from 'node:console';

import { setupApp } from '../../app';
import {
  Video,
  VideoAvailableResolution,
} from '../../videos/types/video.types';
import { UpdateVideoInputDto } from '../../videos/types/video-input-dto.types';

// * Base url
const BASE_URL = '/hometask_01/api';

// * Data
const newTestCreateVideo: Video = {
  id: expect.any(Number),
  title: 'new test title',
  author: 'new test author',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: expect.any(String),
  publicationDate: expect.any(String),
  availableResolutions: [VideoAvailableResolution.P144],
};

describe('Videos API', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });

  // * Helper func
  const createResponse = async () => {
    const response = await request(app)
      .post(`${BASE_URL}/videos`)
      .send({ ...newTestCreateVideo, title: 'New another video' })
      .expect(201);

    return response.body as Video;
  };

  // * CRUD
  it('GET: /videos -> should return videos list', async () => {
    const video1 = { ...newTestCreateVideo, title: 'Another video-1' };
    const video2 = { ...video1, title: 'Another video-2' };

    await request(app).post(`${BASE_URL}/videos`).send(video1).expect(201);

    await request(app).post(`${BASE_URL}/videos`).send(video2).expect(201);

    const videoListResponse = await request(app)
      .get(`${BASE_URL}/videos`)
      .expect(200);

    expect(Array.isArray(videoListResponse.body)).toBe(true);
    expect(videoListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it('POST: /videos -> should create new driver (status - 201)', async () => {
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

  it('GET: /videos/:id -> should return video by id (status - 200)', async () => {
    const getCreatedResponse = await createResponse();

    const currentId = getCreatedResponse.id;

    const getResponse = await request(app)
      .get(`${BASE_URL}/videos/${currentId}`)
      .expect(200);

    expect(getResponse.body).toEqual(getCreatedResponse);
  });

  it('GET: /videos/:id -> should NOT return video by id (If video for passed id does not exist) (status - 404)', async () => {
    await request(app).get(`${BASE_URL}/99999`).expect(404);

    await request(app).get(`${BASE_URL}/abc`).expect(404);
  });

  it('PUT: /videos/:id -> should update video by id (status - 204)', async () => {
    const getCreatedResponse = await createResponse();

    const publicationDateISO = new Date(
      new Date(getCreatedResponse.createdAt).getTime() + 24 * 60 * 60 * 1000,
    ).toISOString();

    const videoUpdateDto: UpdateVideoInputDto = {
      title: 'updated title',
      author: 'updated author',
      canBeDownloaded: false,
      minAgeRestriction: 18,
      publicationDate: publicationDateISO,
      availableResolutions: [
        VideoAvailableResolution.P1440,
        VideoAvailableResolution.P720,
      ],
    };

    const responseResult = await request(app)
      .put(`${BASE_URL}/videos/${getCreatedResponse.id}`)
      .send(videoUpdateDto)
      .expect(204);

    log(responseResult.status, responseResult.body);

    const getResponse = await request(app).get(
      `${BASE_URL}/videos/${getCreatedResponse.id}`,
    );

    expect(getResponse.body).toEqual(
      expect.objectContaining({
        id: getCreatedResponse.id,
        title: 'updated title',
        author: 'updated author',
        canBeDownloaded: false,
        minAgeRestriction: 18,
        createdAt: expect.any(String),
        publicationDate: publicationDateISO,
        availableResolutions: [
          VideoAvailableResolution.P1440,
          VideoAvailableResolution.P720,
        ],
      }),
    );
  });

  it('DELETE: /videos/:id -> should remove and check video after NOT FOUND (status - 404)', async () => {
    const getCreatedResponse = await createResponse();

    const id = getCreatedResponse.id;

    await request(app).delete(`${BASE_URL}/videos/${id}`).expect(204);

    const videoResponse = await request(app).get(`${BASE_URL}/videos/${id}`);

    expect(videoResponse.status).toBe(404);
  });

  // * якщо Jest «висить» після тестів:
  afterAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });
});

// ? toBe - проверяет примитивы или ссылки (строгое ===).
// ? toEqual - полное глубинное равенство всех полей.
// ? toStrictEqual - как toEqual, но еще строже (учитывает различия типа undefined vs отсутствие поля, разные прототипы).
// ? toMatchObject / objectContaining - когда важно только, чтобы некоторые поля соответствовали.
