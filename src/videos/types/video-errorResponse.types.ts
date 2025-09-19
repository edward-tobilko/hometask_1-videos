// * Помилки (Response 400 -> Example Value):
export type ValidationError = {
  field: string;
  message: string;
};
export type ErrorResponse = {
  errorsMessages: ValidationError[];
};
