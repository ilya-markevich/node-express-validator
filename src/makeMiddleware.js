import ExpressValidator from './expressValidator';

export default (customMethods) => (req, res, next) => {
  req.validator = new ExpressValidator(req);
  ExpressValidator.extend(customMethods);

  next();
};
