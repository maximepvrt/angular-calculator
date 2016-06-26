(function () {
    'use strict';

    angular.module('angular-calculator').filter('paramsFilter', [function () {
        return function (params, config) {
            if (params !== undefined) {
                return params.filter(function (param) {
                    if (!param.rules) {
                        return true;
                    }
                    var valid = false;
                    angular.forEach(param.rules, function (rule) {
                        if (valid === false) {
                            valid = true;
                            angular.forEach(rule, function (value, key) {
                                if (config[key] != value) {
                                    valid = false;
                                }
                            });
                        }
                    });
                    return valid;
                }, {});
            }
        };
    }]);

})();