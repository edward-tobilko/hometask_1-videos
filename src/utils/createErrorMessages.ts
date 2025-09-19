import {
  ErrorResponse,
  ValidationError,
} from '../videos/types/video-errorResponse.types';

export const createErrorMessages = (
  errors: ValidationError[],
): ErrorResponse => {
  return {
    errorsMessages: errors,
  };
};
