Angular Calculator
==================
[![Travis](https://img.shields.io/travis/maximepvrt/angular-calculator.svg)](https://travis-ci.org/maximepvrt/angular-calculator)
[![David](https://img.shields.io/david/maximepvrt/angular-calculator.svg)]()
[![npm](https://img.shields.io/npm/v/angular-calculator.svg)](https://www.npmjs.com/package/angular-calculator) [![Bower](https://img.shields.io/bower/v/angular-calculator.svg)](http://bower.io/search/?q=angular-calculator)

An AngularJS module for creating a dynamic calculator

## Requirements

- [Angular.js](http://angularjs.org)

## Exemple

- [http://maximepvrt.github.io/angular-calculator](http://maximepvrt.github.io/angular-calculator)

## Installation
### Add library
This module is available as bower package, install it with this command:

```bash
bower install angular-calculator
```

and it's available too as npm package, install it with this command:

```bash
npm install angular-calculator
```

or you may download the [latest release](https://github.com/maximepvrt/angular-calculator/releases)

```html
<script type="text/javascript" src="/angular-calculator/dist/angular-calculator.min.js"></script>
```
### Add dependency

```javascript
var app = angular.module('myModule', ['angular-calculator']);
```
## Configuration

Param objects
```javascript
[
   {
      "id":"price_euro",
      "defaultValue": 100,
      "min":0,
      "max":1000,
      "step":100,
      "unit":"€",
      "dynamicUnit":null,
      "label":"Price",
      "rules":[
         {
            "currency":"euro"
         }
      ],
      "name":"price"
   },
   {
      "id":"price_dollar",
      "defaultValue":200,
      "min":0,
      "max":1000,
      "step":100,
      "unit":"$",
      "dynamicUnit":null,
      "label":"Price",
      "rules":[
         {
            "currency":"usd"
         }
      ],
      "name":"price"
   },
   {
      "id":"tax",
      "defaultValue":7.5,
      "min":0,
      "max":25,
      "step":0.5,
      "unit":"€",
      "label":"Tax",
      "rules":[
         {
            "currency":"euro",
            "country": "fra"
         }
      ],
      "name":"tax"
   },
   {
      "id":"dynamic_price",
      "defaultValue":5,
      "min":0,
      "max":25,
      "step":0.5,
      "unit":null,
      "dynamicUnit":"currencies",
      "label":"Average consumption",
      "name":"dynamic_price"
   },
]
```

init params
```javascript
app.controller('myController', ['$scope', '$calculator',
    function myController($scope, $calculator) {
        $calculator.setParams(paramsArray);
        $calculator.setParam(paramId, paramObject);
    }
]);
```

## Development

Gulp is used to minify angular-calculator.js (using Uglify). Execute 'npm install' (requires Node and NPM) to install the required packages.

Run "gulp" to generate a minified version (angular-calculator.min.js). Note that this requires gulp to be installed globally (via 'npm install -g gulp').
