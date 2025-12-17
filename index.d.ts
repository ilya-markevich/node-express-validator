import * as express from 'express';
import DeeValidator, { type ValidationError, ValidatorsObject } from 'dee-validator';

declare global {
  namespace Express {
    interface Request {
      validator: DeeExpressValidator;
    }
  }
}

export type DeeExpressValidator = {
  request: express.Request;

  bodyValidator: DeeValidator;

  paramsValidator: DeeValidator;

  queryValidator: DeeValidator;

  hasErrors(): Promise<boolean>;

  getErrors(): Promise<ValidationError[]>;
};

declare function deeExpressValidatorMiddleware(
  customValidators?: ValidatorsObject
): express.RequestHandler;

export = deeExpressValidatorMiddleware;
