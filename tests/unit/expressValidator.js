'use strict';

require('should');
const sinon = require('sinon');

const ExpressValidator = require('../../src/expressValidator');
const Validator = require('dee-validator');

const testData = require('./data/expressValidator');

describe('Express Validator', () => {
  describe('Initial State', () => {
    const { fakeRequest } = testData;
    const validator = new ExpressValidator(fakeRequest);

    (validator.queryValidator instanceof Validator).should.be.eql(true);
    (validator.bodyValidator instanceof Validator).should.be.eql(true);
    (validator.paramsValidator instanceof Validator).should.be.eql(true);
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
      const { fakeRequest } = testData;
      const validator = new ExpressValidator(fakeRequest);

      validator.bodyValidator.getErrors = sinon.stub().returns([{}]);
      validator.paramsValidator.getErrors = sinon.stub().returns([]);
      validator.queryValidator.getErrors = sinon.stub().returns([]);

      validator.getErrors().should.have.length(1);
    });
  });
});