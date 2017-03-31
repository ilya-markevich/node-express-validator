'use strict';

const ExpressValidator = require('./expressValidator');

module.exports = (customMethods) => {
  return (req, res, next) => {
    req.validator = new ExpressValidator(req);
    ExpressValidator.extend(customMethods);

    next();
  };
};