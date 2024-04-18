import { ZodFormattedError } from 'zod';

type ErrorType = {
  message: string;
};

export type ResponseAction<T, D = string> = {
  result: { success: boolean; message: string };
  data: T;
  errors?: ZodFormattedError<D> | ErrorType[] | null;
};

export type ResponseLoader<T> = {
  type: 'success' | 'error';
  errorMessage: string | null;
  data: T;
};
