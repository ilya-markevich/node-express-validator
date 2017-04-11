# Express Dee Validator

[![npm](https://img.shields.io/npm/v/express-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/express-dee-validator)
[![npm](https://img.shields.io/npm/dt/express-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/express-dee-validator)
[![Coverage Status](https://coveralls.io/repos/github/ilya-markevich/node-express-validator/badge.svg?branch=master)](https://coveralls.io/github/ilya-markevich/node-express-validator?branch=master)
[![dependency Status](https://img.shields.io/david/ilya-markevich/node-express-validator.svg?maxAge=1000)](https://david-dm.org/ilya-markevich/node-express-validator)
[![devDependency Status](https://img.shields.io/david/dev/ilya-markevich/node-express-validator.svg?maxAge=1000)](https://david-dm.org/ilya-markevich/node-express-validator?type=dev)
[![Build Status](https://img.shields.io/travis/ilya-markevich/node-express-validator.svg?maxAge=1000)](https://travis-ci.org/ilya-markevich/node-express-validator)
[![Known Vulnerabilities](https://snyk.io/test/github/ilya-markevich/node-express-validator/badge.svg)](https://snyk.io/test/github/ilya-markevich/node-express-validator)
[![node](https://img.shields.io/node/v/express-dee-validator.svg?maxAge=1000)](https://www.npmjs.com/package/express-dee-validator)

[Dee-validator](https://github.com/ilya-markevich/node-validator) port for Express framework.

# Table of contents
* [Usage](#usage)
* [What's in a name?](#whats-in-a-name)
* [Author](#author)

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

app.use((req, res, next) => {
    const validator = req.validator;
    const { bodyValidator, paramsValidator, queryValidator } = validator;

    console.log(validator.request); // you can get request object from the req.validator

    bodyValidator.property('name').isNotEmpty().isTestString();

    paramsValidator.property('id').isNotEmpty();

    queryValidator.property('test').optional().isUpperCaseString();

    if (validator.hasErrors()) { // return true in case if no errors in body, params and query validators
      next({
        errors: validator.getErrors() // here you can get errors from all of the validators
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

# What's in a name?
Dee is one of my favorite detective characters - [Judge Dee](https://en.wikipedia.org/wiki/Judge_Dee).

# Author
Ilya Markevich - [@ilya_mark91](https://twitter.com/ilya_mark91)
