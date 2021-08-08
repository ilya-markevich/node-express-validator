import validator = require("../index");
import * as express from "express";

const app = express();

app.use(validator());

app.use(async (req, _, next) => {
  const { bodyValidator, paramsValidator, queryValidator } = req.validator;
  const requestObj: express.Request = req.validator.request;

  requestObj.accepts();

  bodyValidator.property("prop1").optional().isArray();
  paramsValidator.property("prop2").isNotEmpty().withMessage("test message");
  queryValidator.property("prop3").optional().isBoolean();

  const hasErrors = await req.validator.hasErrors();

  if (hasErrors) {
    const errors = await req.validator.getErrors();

    errors.forEach((error) => {
      console.log(`${error.value}, ${error.errorMessage}, ${error.path}`);
    });

    next(errors);
    return;
  }

  next();
});
