import * as express from "express";
import DeeValidator = require("dee-validator");

declare global {
  namespace Express {
    interface Request {
      validator: deeExpressValidatorMiddleware.DeeExpressValidator;
    }
  }
}

declare namespace deeExpressValidatorMiddleware {
  interface DeeExpressValidator {
    request: express.Request;

    bodyValidator: DeeValidator;

    paramsValidator: DeeValidator;

    queryValidator: DeeValidator;

    hasErrors(): Promise<boolean>;

    getErrors(): Promise<DeeValidator.ValidationError[]>;
  }
}

declare function deeExpressValidatorMiddleware(
  customValidators?: DeeValidator.ValidatorsObject
): express.RequestHandler;

export = deeExpressValidatorMiddleware;
