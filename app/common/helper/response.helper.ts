interface IResponse {
  success: boolean;
  message?: string;
  data: object | null | any;
}

export type ErrorResponse = IResponse & {
  error_code: number;
};

/**
 * Create a response object with status
 * @param data Data to be returned
 * @param message Sucess or error status message
 * @returns Response object
 */
export const createResponse = (
  data: IResponse["data"],
  message?: string
): IResponse => {
  return { data, message, success: true };
};
