import { VideoAvailableResolution } from './video.types';

// * Те, що надсилає клієнт у body (Request body -> Example Value у Swagger):
export type VideoInputDto = {
  title: string;
  author: string;
  availableResolutions: VideoAvailableResolution[];
};
