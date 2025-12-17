import makeMiddlewareTest from '../../src/makeMiddleware';
import testData from './data/makeMiddleware';

describe('Make Middleware', () => {
  describe('middleware', () => {
    it('should add validator to request', () => {
      const { fakeRequest } = testData;
      const next = jest.fn();
      const middleware = makeMiddlewareTest(null);

      middleware(fakeRequest, {}, next);

      expect(fakeRequest).toHaveProperty('validator');
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
