import { Video, VideoAvailableResolution } from '../videos/types/video.types';

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'Video-1',
      author: 'Author-1',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [
        VideoAvailableResolution.P144,
        VideoAvailableResolution.P360,
      ],
    },
    {
      id: 2,
      title: 'Video-2',
      author: 'Author-2',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [
        VideoAvailableResolution.P144,
        VideoAvailableResolution.P1080,
        VideoAvailableResolution.P1440,
      ],
    },
    {
      id: 3,
      title: 'Video-3',
      author: 'Author-3',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: [],
    },
  ],
};
