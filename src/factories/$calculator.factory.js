(function () {
    'use strict';

    angular.module('angular-calculator').factory('$calculator', ['$rootScope', '$filter',
        function ($rootScope, $filter) {

            var data = {
                config: {},
                units: {},
                params: [],
                filteredParams: [],
                values: {}

            };

            var extraRules = function () {
            };
            var calculator = function () {
            };

            function updateDynamicUnit() {
                data.params = data.params.map(function (param) {
                    if (param.dynamicUnit) {
                        var lastUnit = null;
                        var currentUnit = null;
                        angular.forEach(data.units[param.dynamicUnit], function (unit) {
                            if (unit.value && param.dynamicUnitValue && param.dynamicUnitValue === unit.id) {
                                lastUnit = unit;
                            }
                            if (data.config[param.dynamicUnit] === unit.id) {
                                currentUnit = unit;
                            }
                        });
                        if (lastUnit === null) {
                            lastUnit = {
                                value: 1
                            };
                        }
                        if (!currentUnit.value) {
                            currentUnit.value = 1;
                        }

                        param.dynamicUnitValue = data.config[param.dynamicUnit];
                        param.unit = currentUnit.sign;
                        param.max = $filter('round')(param.max / lastUnit.value * currentUnit.value, 2);
                        param.min = $filter('round')(param.min / lastUnit.value * currentUnit.value, 2);
                        param.step = $filter('round')(param.step / lastUnit.value * currentUnit.value, 2);
                        param.value = $filter('round')(param.value / lastUnit.value * currentUnit.value, 2);
                    }
                    return param;
                });
            }

            function updateFilteredParams() {
                data.filteredParams = $filter('paramsFilter')(data.params, data.config);
            }

            function updateValues() {
                data.values = {};
                angular.forEach(data.filteredParams, function (param) {
                    if (data.values[param.name] === undefined || data.values[param.name].id !== param.id) {
                        data.values[param.name] = param.value;
                    }
                });
            }

            var methods = {
                setParamValue: function (id, value) {
                    data.params = data.params.map(function (param) {
                        if (id === param.id) {
                            param.value = value;
                        }
                        return param;
                    });
                    data.filteredParams = data.filteredParams.map(function (param) {
                        if (id === param.id) {
                            param.value = value;
                        }
                        return param;
                    });
                },
                setParam: function (id, param) {
                    if(!param.value) {
                        param.value = param.defaultValue;
                    }
                    var added = false;
                    data.params = data.params.map(function (p) {
                        if (id === p.id) {
                            added = true;
                            return param;
                        }
                        return p;
                    });
                    data.filteredParams = data.filteredParams.map(function (p) {
                        if (id === p.id) {
                            added = true;
                            return param;
                        }
                        return p;
                    });
                    if (!added) {
                        //data.params.push(param);
                    }
                },
                param: function (id) {
                    return angular.copy(data.params.filter(function (param) {
                        return id === param.id;
                    })[0]);
                },
                setParams: function (params) {
                    data.params = params.map(function (p) {
                        if(!p.value) {
                            p.value = p.defaultValue;
                        }
                        return p;
                    });
                },
                params: function () {
                    return angular.copy(data.params);
                },
                values: function () {
                    return angular.copy(data.values);
                },
                resetValues: function () {
                    data.params = data.params.map(function (p) {
                        p.value = p.defaultValue;
                        return p;
                    });
                    data.filteredParams = data.filteredParams.map(function (p) {
                        p.value = p.defaultValue;
                        return p;
                    });
                },
                valuesToDefaultValues: function () {
                    data.params = data.params.map(function (p) {
                        p.defaultValue = p.value;
                        return p;
                    });
                    data.filteredParams = data.filteredParams.map(function (p) {
                        p.defaultValue = p.value;
                        return p;
                    });
                },
                paramsValues: function () {
                    return data.params.reduce(function (total, current) {
                        total[current.id] = current.value;
                        return total;
                    }, {});
                },
                value: function (name) {
                    return angular.copy(data.values[name]);
                },
                setValue: function (name, value) {
                    data.values[name] = value;
                },
                filteredParams: function () {
                    return angular.copy(data.filteredParams);
                },
                addUnit: function (name, values) {
                    data.units[name] = values;
                    var initUnit = values.filter(function (val) {
                        return (val.value === undefined || val.value === null || val.value === 1);
                    })[0];
                    data.config[name] = initUnit.id;
                },
                currentUnit: function (name) {
                    return data.units[name].filter(function (val) {
                        return (val.id === data.config[name]);
                    })[0];

                },
                config: function () {
                    return angular.copy(data.config);
                },
                setConfig: function (config) {
                    angular.forEach(config, function (conf, key) {
                        data.config[key] = conf;
                    });
                }
            };

            function updateAll() {
                updateFilteredParams();
                updateDynamicUnit();
                update();
            }

            function update() {
                updateValues();
                extraRules(methods);
                calculator(methods);
            }

            $rootScope.ok = extraRules;

            return {
                data: data,
                extraRules: function (f) {
                    extraRules = f;
                },
                calculator: function (f) {
                    calculator = f;
                },
                param: methods.param,
                params: methods.params,
                filteredParams: methods.filteredParams,
                setParams: function (params) {
                    methods.setParams(params);
                    updateAll();
                },
                setParam: function (id, param) {
                    methods.setParam(id, param);
                    update();
                },
                setParamValue: function (id, value) {
                    methods.setParamValue(id, value);
                    update();
                },
                config: methods.config,
                addUnit: methods.addUnit,
                values: methods.values,
                value: methods.value,
                currentUnit: methods.currentUnit,
                setConfig: function (config) {
                    methods.setConfig(config);
                    updateAll();
                },
                resetValues: function () {
                    methods.resetValues();
                    update();
                },
                valuesToDefaultValues: function () {
                    methods.valuesToDefaultValues();
                    update();
                },
                setValue: function (name, value) {
                    methods.setValue(name, value);
                    calculator(methods);
                },
                paramsValues: methods.paramsValues
            };

        }]);

})();