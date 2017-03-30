'use strict';

const ExpressValidator = require('./expressValidator');

module.exports = (req, res, next) => {
  req.validator = new ExpressValidator(req);
  next();
};