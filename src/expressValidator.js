'use strict';

const Validator = require('dee-validator');

class ExpressValidator {
  constructor(req) {
    this._bodyValidator = new Validator(req.body);
    this._paramsValidator = new Validator(req.params);
    this._queryValidator = new Validator(req.query);
  }

  get bodyValidator() {
    return this._bodyValidator;
  }

  get paramsValidator() {
    return this._paramsValidator;
  }

  get queryValidator() {
    return this._queryValidator;
  }

  hasErrors() {
    const self = this;

    return self.bodyValidator.hasErrors() || self.paramsValidator.hasErrors() || self.queryValidator.hasErrors();
  }

  getErrors() {
    const self = this;
    const validators = [self.bodyValidator, self.paramsValidator, self.queryValidator];

    return validators.reduce((errors, validator) => {
      return errors.concat(validator.getErrors());
    }, []);
  }
}

module.exports = ExpressValidator;