// ? dto (Data Transfer Object) - то, что присылает клиент в body (request)

import { CreateVideoInputDto } from '../types/video-input-dto.types';
import { VideoAvailableResolution } from '../types/video.types';

// * Те, що надсилає клієнт у body (Request body -> Example Value у Swagger):
export const videoInputDto: CreateVideoInputDto = {
  title: 'Another video-1',
  author: 'Another author-1',
  availableResolutions: [VideoAvailableResolution.P144],
};
