app = angular.module('angular-calculator-exemple', [
	'angular-calculator'
	]);

app.controller('myController', ['$scope', '$calculator',
    function myController($scope, $calculator) {
    	$calculator.addUnit('currencies', [
        {
        	id: 'euro',
            label: 'Euro',
            sign: '€',
        },
        {
        	id: 'usd',
            label: 'USD',
            sign: '$',
        }]);

        $calculator.setParams([
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
]);
$scope.$calculator = $calculator;

    }
]);