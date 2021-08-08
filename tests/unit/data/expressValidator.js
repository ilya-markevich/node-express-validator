"use strict";

const fakeRequest = { body: {}, params: {}, query: {} };

const validatorError = {
  path: "test",
  errorMessage: "error message",
  value: 0,
};
const expressValidatorErrors = {
  test: {
    param: validatorError.path,
    msg: validatorError.errorMessage,
    value: validatorError.value,
  },
};

module.exports = {
  fakeRequest,
  validatorError,
  expressValidatorErrors,
};
