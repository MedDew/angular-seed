'use strict';

var carService = angular.module("CarServices", ["ngResource"]);
carService.constant('apiURL', 
                    {
                        baseURL : "http://ngcarsdemo.azurewebsites.net/api/mehdiG/",
                        carListEndpoint : "cars",
                        carSpecificEndpoint : "cars/:carId",
                        carCreateEndpoint : "cars",
                        carDeleteEndpoint : "cars/:carId",
                        carUpdateEndpoint : "cars/:carId",
                    }
                   );

carService.factory("Car", ["$resource", "apiURL", function($resource, apiURL)
    {
        console.log(apiURL);
        return $resource(
                            apiURL.baseURL+apiURL.carListEndpoint, 
                            {}, 
                            {
                                carList : {methods : "GET", params : "", isArray : true} 
                            }
                        );
    }
]);