import { ValidationError } from '../types/video-errorResponse.types';
import { VideoInputDto } from '../types/video-input-dto.types';
import { VideoAvailableResolution } from '../types/video.types';

export const videoInputDtoValidation = (
  data: VideoInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim().length > 40
  ) {
    errors.push({
      field: 'title',
      message: 'Title length should be no more 40 symbols',
    });
  }

  if (
    !data.author ||
    typeof data.author !== 'string' ||
    data.author.trim().length > 20
  ) {
    errors.push({
      field: 'author',
      message: 'Author must be no more 20 symbols',
    });
  }

  if (
    !Array.isArray(data.availableResolutions) ||
    !data.availableResolutions.every((currentValue) =>
      Object.values(VideoAvailableResolution).includes(currentValue),
    )
  ) {
    errors.push({
      field: 'availableResolutions',
      message: 'Invalid resolutions list',
    });
  }

  return errors;
};
