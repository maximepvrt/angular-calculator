Angular Google GApi 
=======================
[![Travis](https://img.shields.io/travis/maximepvrt/angular-calculator.svg)](https://travis-ci.org/maximepvrt/angular-calculator)
[![David](https://img.shields.io/david/maximepvrt/angular-calculator.svg)]()
[![npm](https://img.shields.io/npm/v/angular-calculator.svg)](https://www.npmjs.com/package/angular-calculator) [![Bower](https://img.shields.io/bower/v/angular-calculator.svg)](http://bower.io/search/?q=angular-calculator)

An AngularJS module for create a dynamic calculator

## Requirements

- [Angular.js](http://angularjs.org)

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


## Development

Gulp is used to minify angular-google-gapi.js (using Uglify). Execute 'npm install' (requires Node and NPM) to install the required packages.

Run "gulp" to generate a minified version (angular-google-gapi.min.js). Note that this requires gulp to be installed globally (via 'npm install -g gulp').
