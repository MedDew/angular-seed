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
        this.carList = function carList()
        {
            // console.log($resource);
            return $resource(apiURL.baseURL+apiURL.carListEndpoint, 
                      {}, 
                      {
                        carList : {methods : "GET", params : {}, isArray : true} 
                      }
                     );
        }
        
        this.carSpecific = function carSpecific(id)
        {
            console.log("Fetch that car : "+id);
            return $resource(apiURL.baseURL+apiURL.carSpecificEndpoint, 
                      {carId : "@id"}, 
                      {
                        carSpecific : {methods : "GET", params : {}, isArray : false} 
                      }
                     );
        }
        
        return this;
    }
]);