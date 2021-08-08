"use strict";

const Validator = require("dee-validator");

class ExpressValidator {
  constructor(req) {
    this._bodyValidator = null;
    this._paramsValidator = null;
    this._queryValidator = null;
    this._req = req;
  }

  get request() {
    return this._req;
  }

  get bodyValidator() {
    return this._getSingleton("_bodyValidator", this.request.body);
  }

  get paramsValidator() {
    return this._getSingleton("_paramsValidator", this.request.params);
  }

  get queryValidator() {
    return this._getSingleton("_queryValidator", this.request.query);
  }

  _getSingleton(field, objToValidate) {
    if (!this[field]) {
      this[field] = new Validator(objToValidate);
    }

    return this[field];
  }

  async hasErrors() {
    const hasErrorsResults = await Promise.all([
      this.bodyValidator.hasErrors(),
      this.paramsValidator.hasErrors(),
      this.queryValidator.hasErrors(),
    ]);

    return hasErrorsResults.some((hasError) => hasError);
  }

  async getErrors() {
    const validators = [
      this.bodyValidator,
      this.paramsValidator,
      this.queryValidator,
    ];
    const validatorsErrors = await Promise.all(
      validators.map((validator) => validator.getErrors())
    );

    return validatorsErrors.reduce((result, validationErrors) => {
      validationErrors.forEach(({ path, errorMessage, value }) => {
        result[path] = { param: path, msg: errorMessage, value };
      });

      return result;
    }, {});
  }

  static extend(customMethods) {
    Validator.extend(Object(customMethods));
  }
}

module.exports = ExpressValidator;
