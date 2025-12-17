const fakeRequest = { body: {}, params: {}, query: {} };

const validatorError = {
  path: 'test',
  errorMessage: 'error message',
  value: 0
};

const expressValidatorErrors = [
  {
    path: validatorError.path,
    errorMessage: validatorError.errorMessage,
    value: validatorError.value
  },
  {
    path: validatorError.path,
    errorMessage: validatorError.errorMessage,
    value: validatorError.value
  }
];

export default {
  fakeRequest,
  validatorError,
  expressValidatorErrors
};
