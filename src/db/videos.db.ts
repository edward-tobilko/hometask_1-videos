import { Video, VideoAvailableResolution } from '../videos/types/video.types';

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'string1',
      author: 'string2',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: '2025-09-17T20:30:16.492Z',
      availableResolutions: [
        VideoAvailableResolution.P144,
        VideoAvailableResolution.P360,
      ],
    },
    {
      id: 2,
      title: 'string2',
      author: 'string3',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: '2020-09-17T20:30:16.492Z',
      availableResolutions: [
        VideoAvailableResolution.P144,
        VideoAvailableResolution.P2160,
        VideoAvailableResolution.P720,
      ],
    },
    {
      id: 3,
      title: 'string3',
      author: 'string4',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: '2015-09-17T20:30:16.492Z',
      availableResolutions: [],
    },
  ],
};
