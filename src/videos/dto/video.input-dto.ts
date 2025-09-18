// ? dto (Data Transfer Object) - то, что присылает клиент (request)

import { VideoInputDto } from '../types/video-input-dto.types';
import { VideoAvailableResolution } from '../types/video.types';

export const videoInputDto: VideoInputDto = {
  title: 'Another video-1',
  author: 'Another author-1',
  canBeDownloaded: false,
  minAgeRestriction: null,
  createdAt: new Date().toISOString(),
  publicationDate: new Date().toISOString(),
  availableResolutions: [VideoAvailableResolution.P144],
};
