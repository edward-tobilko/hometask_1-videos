// ? dto (Data Transfer Object) - то, что присылает клиент в body (request)

import { VideoInputDto } from '../types/video-input-dto.types';
import { VideoAvailableResolution } from '../types/video.types';

// * Те, що надсилає клієнт у body (Request body -> Example Value у Swagger):
export const videoInputDto: VideoInputDto = {
  title: 'Another video-1',
  author: 'Another author-1',
  availableResolutions: [VideoAvailableResolution.P144],
};
