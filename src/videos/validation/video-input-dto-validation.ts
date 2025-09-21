import { ValidationError } from '../types/video-errorResponse.types';
import {
  CreateVideoInputDto,
  UpdateVideoInputDto,
} from '../types/video-input-dto.types';
import { VideoAvailableResolution } from '../types/video.types';

export const createVideoInputDtoValidation = (
  data: CreateVideoInputDto,
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
    data.availableResolutions.length < 1 ||
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

export const updateVideoInputDtoValidation = (
  data: UpdateVideoInputDto,
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
    data.availableResolutions.length < 1 ||
    !data.availableResolutions.every((currentValue) =>
      Object.values(VideoAvailableResolution).includes(currentValue),
    )
  ) {
    errors.push({
      field: 'availableResolutions',
      message: 'Invalid resolutions list',
    });
  }

  if (typeof data.canBeDownloaded !== 'boolean') {
    errors.push({ field: 'canBeDownloaded', message: 'Must be boolean' });
  }

  if (
    typeof data.publicationDate !== 'string' ||
    Number.isNaN(Date.parse(data.publicationDate))
  ) {
    errors.push({
      field: 'publicationDate',
      message: 'Must be a valid ISO date-time string',
    });
  }

  if (data.minAgeRestriction !== null) {
    if (
      typeof data.minAgeRestriction !== 'number' ||
      !Number.isInteger(data.minAgeRestriction) ||
      data.minAgeRestriction < 1 ||
      data.minAgeRestriction > 18
    ) {
      errors.push({
        field: 'minAgeRestriction',
        message: 'Must be integer from 1 to 18 or null',
      });
    }
  }

  return errors;
};
