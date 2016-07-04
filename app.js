app = angular.module('angular-calculator-exemple', [
    'ui.slider',
    'angular-calculator'
]);

app.controller('myController', ['$scope', '$calculator',
    function ($scope, $calculator) {

        $calculator.addUnit('currency', [
            {
                id: 'euro',
                label: 'Euro',
                sign: '€'
            },
            {
                id: 'usd',
                label: 'USD',
                sign: '$',
                value: 1.11385
            }]);

        $calculator.setParams([
            {
                id: "design_day_price",
                defaultValue: 400,
                min: 0,
                max: 2000,
                step: 10,
                dynamicUnit: "currency",
                label: "Design : Prix à la journée",
                name: "design_day_price",
                rules: [
                    {design: true}
                ]
            },
            {
                "id": "design_day_sold",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Design : Nombre de jours vendus",
                "name": "design_day_sold",
                rules: [
                    {design: true}
                ]
            },
            {
                "id": "design_day_cost",
                "defaultValue": 200,
                "min": 0,
                "max": 1000,
                "step": 10,
                "dynamicUnit": "currency",
                "label": "Design : Coût d'une journée pour l'entreprise",
                "name": "design_day_cost",
                rules: [
                    {design: true}
                ]
            },
            {
                "id": "design_day_executed",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Design : Nombre de jours réalisés",
                "name": "design_day_executed",
                rules: [
                    {design: true}
                ]
            },
            {
                id: "dev_day_price",
                defaultValue: 400,
                min: 0,
                max: 2000,
                step: 10,
                dynamicUnit: "currency",
                label: "Dev : Prix à la journée",
                name: "dev_day_price",
                rules: [
                    {dev: true}
                ]
            },
            {
                "id": "dev_day_sold",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Dev : Nombre de jours vendus",
                "name": "dev_day_sold",
                rules: [
                    {dev: true}
                ]
            },
            {
                "id": "dev_day_cost",
                "defaultValue": 200,
                "min": 0,
                "max": 1000,
                "step": 10,
                "dynamicUnit": "currency",
                "label": "Dev : Coût d'une journée pour l'entreprise",
                "name": "dev_day_cost",
                rules: [
                    {dev: true}
                ]
            },
            {
                "id": "dev_day_executed",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Dev : Nombre de jours réalisés",
                "name": "dev_day_executed",
                rules: [
                    {dev: true}
                ]
            },
            {
                id: "integration_day_price",
                defaultValue: 400,
                min: 0,
                max: 2000,
                step: 10,
                dynamicUnit: "currency",
                label: "Intégration : Prix à la journée",
                name: "integration_day_price",
                rules: [
                    {integration: true}
                ]
            },
            {
                "id": "integration_day_sold",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Intégration : Nombre de jours vendus",
                "name": "integration_day_sold",
                rules: [
                    {integration: true}
                ]
            },
            {
                "id": "integration_day_cost",
                "defaultValue": 200,
                "min": 0,
                "max": 1000,
                "step": 10,
                "dynamicUnit": "currency",
                "label": "Intégration : Coût d'une journée pour l'entreprise",
                "name": "integration_day_cost",
                rules: [
                    {integration: true}
                ]
            },
            {
                "id": "integration_day_executed",
                "defaultValue": 10,
                "min": 0,
                "max": 60,
                "step": 1,
                "unit": "Jours",
                "label": "Intégration : Nombre de jours réalisés",
                "name": "integration_day_executed",
                rules: [
                    {integration: true}
                ]
            }
        ]);


        $calculator.calculator(function (calculator) {
            function calculate(name) {
                if (calculator.value(name + '_day_price') !== undefined) {
                    calculator.setValue(name, ( calculator.value(name + '_day_price') * calculator.value(name + '_day_sold') ) - ( calculator.value(name + '_day_cost') * calculator.value(name + '_day_executed') ));
                } else {
                    calculator.setValue(name, 0);
                }
            }

            calculate('design');
            calculate('dev');
            calculate('integration');

            calculator.setValue('total', calculator.value('design') + calculator.value('dev') + calculator.value('integration'));

        });

        $calculator.extraRules(function (calculator) {

            function extraRule(type) {
                var dayPrice = calculator.param(type + '_day_price');
                var dayCost = calculator.param(type + '_day_cost');
                if (dayPrice !== undefined && dayCost !== undefined) {
                    dayCost.max = dayPrice.value;
                    if (dayCost.value >= dayPrice.value) {
                        dayCost.value = dayPrice.value;
                    }
                    calculator.setParam(type+'_day_cost', dayCost);
                }
            }

            extraRule('design');
            extraRule('dev');
            extraRule('integration');

        });


        $scope.calculator = $calculator;

        //////////////
        // sync params
        //////////////
        $scope.$watch('params', function (newParams, exParams) {
            angular.forEach(newParams, function (param, key) {
                if (exParams !== undefined) {
                    var exParam = exParams[key];
                    if (exParam !== undefined && param.value !== exParam.value) {
                        $calculator.setParamValue(param.id, param.value);
                    }
                }
            });
        }, true);

        $scope.$watch(function () {
            return $calculator.filteredParams()
        }, function () {
            $scope.params = $calculator.filteredParams();
        }, true);

        //////////////
        // sync values
        //////////////
        $scope.$watch(function () {
            return $calculator.values()
        }, function () {
            $scope.values = $calculator.values();
        }, true);

        ////////////////
        // Configuration
        ////////////////
        $scope.config = $calculator.config();
        $scope.$watch('config', function (config) {
            $calculator.setConfig(config);
        }, true);
        $scope.config.design = true;
        $scope.config.dev = true;
        $scope.config.integration = true;

    }
]);