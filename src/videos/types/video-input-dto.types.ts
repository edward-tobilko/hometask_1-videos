import { VideoAvailableResolution } from './video.types';

export type VideoInputDto = {
  title: string;
  author: string;
  canBeDownloaded: boolean | false;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: VideoAvailableResolution[];
};
