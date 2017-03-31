'use strict';

require('should');
const sinon = require('sinon');

const ExpressValidator = require('../../src/expressValidator');
const testData = require('./data/expressValidator');

describe('Express Validator', () => {
  describe('Initial State', () => {
    it('should check initial state', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidator(fakeRequest);

      (validator._queryValidator === null).should.be.eql(true);
      (validator._bodyValidator === null).should.be.eql(true);
      (validator._paramsValidator === null).should.be.eql(true);
      validator.request.should.be.eql(fakeRequest);
    });

    it('should check singleton getters', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidator(fakeRequest);

      const bodyValidator = validator.bodyValidator;
      const paramsValidator = validator.paramsValidator;
      const queryValidator = validator.queryValidator;

      bodyValidator.should.be.eql(validator.bodyValidator);
      paramsValidator.should.be.eql(validator.paramsValidator);
      queryValidator.should.be.eql(validator.queryValidator);
    });
  });

  describe('Static Methods', () => {
    describe('#extend', () => {
      it('should call extend even if methods not passed', () => {
        ExpressValidator.extend(null);
      });
    });
  });

  describe('#hasErrors', () => {
    it('should return that validator has errors', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidator(fakeRequest);

      validator.bodyValidator.hasErrors = sinon.stub().returns(false);
      validator.paramsValidator.hasErrors = sinon.stub().returns(false);
      validator.queryValidator.hasErrors = sinon.stub().returns(true);

      validator.hasErrors().should.be.eql(true);
    });

    it('should return that validator has no errors', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidator(fakeRequest);

      validator.bodyValidator.hasErrors = sinon.stub().returns(false);
      validator.paramsValidator.hasErrors = sinon.stub().returns(false);
      validator.queryValidator.hasErrors = sinon.stub().returns(false);

      validator.hasErrors().should.be.eql(false);
    });
  });

  describe('#getErrors', () => {
    it('should return errors', () => {
      const { fakeRequest, validatorError, expressValidatorErrors } = testData;
      const validator = new ExpressValidator(fakeRequest);

      validator.bodyValidator.getErrors = sinon.stub().returns([validatorError]);
      validator.paramsValidator.getErrors = sinon.stub().returns([]);
      validator.queryValidator.getErrors = sinon.stub().returns([]);

      validator.getErrors().should.be.eql(expressValidatorErrors);
    });
  });
});