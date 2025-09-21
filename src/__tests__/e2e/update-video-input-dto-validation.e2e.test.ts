import express from 'express';
import request from 'supertest';

import { setupApp } from '../../app';
import {
  Video,
  VideoAvailableResolution,
} from '../../videos/types/video.types';

const BASE_URL = '/hometask_01/api';

const newTestUpdateVideo: Video = {
  id: expect.any(Number),
  title: 'New test video-1',
  author: 'New test author-1',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: expect.any(String),
  publicationDate: expect.any(String),
  availableResolutions: [],
};

describe('Update video API body validation check', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });

  it.each([
    ['title > 40', { title: 'maxLength'.repeat(41) }],
    ['author > 20', { author: 'maxLength'.repeat(21) }],
    ['availableResolutions empty', { availableResolutions: [] }],
    [
      'availableResolutions has incorrect values',
      { availableResolutions: [VideoAvailableResolution.P144, 'P999'] },
    ],
    ['canBeDownloaded NOT a boolean', { canBeDownloaded: 'yes' }],
    ['publicationDate NOT ISO', { publicationDate: 'not-a-date' }],
    ['minAgeRestriction OFF [1..18]', { minAgeRestriction: 19 }],
  ] as const)(
    'should not update video if the inputModel has incorrect values (status - 400)',
    async (_name, patch) => {
      const createResponse = await request(app)
        .post(`${BASE_URL}/videos`)
        .send({
          ...newTestUpdateVideo,
          title: 'test title',
          author: 'test author',
          availableResolutions: [VideoAvailableResolution.P144],
        })
        .expect(201);

      await request(app)
        .put(`${BASE_URL}/videos/${createResponse.body.id}`)
        .send({
          ...newTestUpdateVideo,
          ...patch,
        })
        .expect(400);
    },
  );

  it('should not update video if it NOT FOUND (status - 404)', async () => {
    await request(app)
      .put(`${BASE_URL}/video/999999`)
      .send({
        ...newTestUpdateVideo,
        title: 'string',
        author: 'string',
        canBeDownloaded: false,
        minAgeRestriction: null,
        publicationDate: new Date().toISOString(),
        availableResolutions: [VideoAvailableResolution.P144],
      })
      .expect(404);
  });

  // * якщо Jest «висить» після тестів:
  afterAll(async () => {
    await request(app).delete(`${BASE_URL}/testing/all-data`).expect(204);
  });
});

// ? it.each() - параметризований тест (масив кейсів, яких потрібно обробити від помилок).
// ? patch — частина тіла запиту, яка ламає валідатор.
// ? as const  - робить масив літеральним та readonly (типи рядків/значень не розширюються до string/number).
// ? async (_name, patch) - аргументи колбеку отримують значення з кортежу, де_name — не використовується, а patch — об’єкт, який ми додамо до валідного тіла, щоб зробити його невалідним.
// ? { ...newTestUpdateVideo, ...patch } — spread-мердж: беремо валідний об’єкт і перекриваємо одне поле з patch.
