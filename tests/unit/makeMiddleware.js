'use strict';

require('should');
const sinon = require('sinon');

const makeMiddleware = require('../../src/makeMiddleware');
const testData = require('./data/makeMiddleware');

describe('Make Middleware', () => {
  describe('middleware', () => {
    it('should add validator to request', () => {
      const { fakeRequest } = testData;
      const next = sinon.mock().once();

      makeMiddleware(fakeRequest, {}, next);

      fakeRequest.should.have.property('validator');
      next.verify();
    });
  });
});