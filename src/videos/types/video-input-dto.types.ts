// * Те, що надсилає клієнт у body (Request body -> Example Value у Swagger):

import { VideoAvailableResolution } from './video.types';

export type CreateVideoInputDto = {
  title: string;
  author: string;
  availableResolutions: VideoAvailableResolution[];
};

export type UpdateVideoInputDto = {
  title: string;
  author: string;
  availableResolutions: VideoAvailableResolution[];
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  publicationDate: string;
};
