# Express Dee Validator

[![npm](https://img.shields.io/npm/v/express-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/express-dee-validator)
[![npm](https://img.shields.io/npm/dt/express-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/express-dee-validator)

[Dee-validator](https://github.com/ilya-markevich/node-validator) port for Express framework.

# Table of contents
* [Migration to v2/v3](#migration-to-v2)
* [Usage](#usage)
* [Author](#author)

# Migration to v2

The [v1](https://github.com/ilya-markevich/node-express-validator/tree/v1.1.1) doesn't support async validators meaning the API is synchronous.
For migration to v2/v3, await `getErrors` and `hasErrors` methods.

# Usage

The middleware creates validator which contains three [dee-validators](https://github.com/ilya-markevich/node-validator) for `req.body`, `req.query` and `req.params` objects.
You can use each validator separately.

The example of code:
```javascript

const express = require('express');
const validator = require('express-dee-validator');

const app = express();
const customValidators = { // custom validators
    isTestString: {
        execute: value => value === 'test'
    }
}

app.use(validator(customValidators));

app.use(async (req, res, next) => {
    const validator = req.validator;
    const { bodyValidator, paramsValidator, queryValidator } = validator;

    console.log(validator.request); // you can get request object from the req.validator

    bodyValidator.property('name').isNotEmpty().isTestString();

    paramsValidator.property('id').isNotEmpty();

    queryValidator.property('test').optional().isUpperCaseString();

    if (await validator.hasErrors()) { // return true in case if no errors in body, params and query validators
      next({
        errors: await validator.getErrors() // here you can get errors from all of the validators
      });
    } else {
      next();
    }
})
```

You can find more details about creation of custom validators and a validator usage [here](https://github.com/ilya-markevich/node-validator).

Example of errors format:
``` javascript
{
    'name': {
        param: 'name',
        message: 'name should be a string',
        value: 0
    },
    'id': {
        param: 'id',
        message: 'id should be an integer',
        value: 'test'
    }
}
```

# Author
Ilya Markevich
