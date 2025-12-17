import ExpressValidatorTest from '../../src/expressValidator';
import testData from './data/expressValidator';

describe('Express Validator', () => {
  describe('Initial State', () => {
    it('should check initial state', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidatorTest(fakeRequest);

      expect(validator._queryValidator === null).toBe(true);
      expect(validator._bodyValidator === null).toBe(true);
      expect(validator._paramsValidator === null).toBe(true);

      expect(validator.request).toBe(fakeRequest);
    });

    it('should check singleton getters', () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidatorTest(fakeRequest);

      const bodyValidator = validator.bodyValidator;
      const paramsValidator = validator.paramsValidator;
      const queryValidator = validator.queryValidator;

      expect(bodyValidator).toBe(validator.bodyValidator);
      expect(paramsValidator).toBe(validator.paramsValidator);
      expect(queryValidator).toBe(validator.queryValidator);
    });
  });

  describe('Static Methods', () => {
    describe('#extend', () => {
      it('should call extend even if methods not passed', () => {
        ExpressValidatorTest.extend(null);
      });
    });
  });

  describe('#hasErrors', () => {
    it('should return that validator has errors', async () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidatorTest(fakeRequest);

      validator.bodyValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.paramsValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.queryValidator.hasErrors = jest.fn().mockResolvedValue(true);

      expect(await validator.hasErrors()).toBe(true);
    });

    it('should return that validator has no errors', async () => {
      const { fakeRequest } = testData;
      const validator = new ExpressValidatorTest(fakeRequest);

      validator.bodyValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.paramsValidator.hasErrors = jest.fn().mockResolvedValue(false);
      validator.queryValidator.hasErrors = jest.fn().mockResolvedValue(false);

      expect(await validator.hasErrors()).toBe(false);
    });
  });

  describe('#getErrors', () => {
    it('should return errors', async () => {
      const { fakeRequest, validatorError, expressValidatorErrors } = testData;
      const validator = new ExpressValidatorTest(fakeRequest);

      validator.bodyValidator.getErrors = jest.fn().mockResolvedValue([validatorError]);
      validator.paramsValidator.getErrors = jest.fn().mockResolvedValue([]);
      validator.queryValidator.getErrors = jest.fn().mockResolvedValue([validatorError]);

      expect(await validator.getErrors()).toEqual(expressValidatorErrors);
    });
  });
});
