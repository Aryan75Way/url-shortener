import { type ErrorRequestHandler } from "express";
import { ErrorResponse } from "../helper/response.helper";

/**
 * A middleware to handle errors
 * @param err Error object
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;
