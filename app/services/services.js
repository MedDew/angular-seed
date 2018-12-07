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
        this.carList = function ()
        {
            console.log("Car List service method");
            return $resource(apiURL.baseURL+apiURL.carListEndpoint, 
                {}, 
                {
                    carList : {method : "GET", params : {}, isArray : true} 
                }
                );
            }
            
            this.carSpecific = function carSpecific(id)
            {
                console.log("Car Specific service method");
                console.log("Fetch that car : "+id);
                console.log("Specific URL : ", apiURL.baseURL+apiURL.carSpecificEndpoint);
                return $resource(apiURL.baseURL+apiURL.carSpecificEndpoint, 
                        {carId : "@id"}, 
                        {
                            carSpecific : {method : "GET", params : {}, isArray : false} 
                        }
                        );
        }
        
        this.postCar = function postCar(car)
        {
            console.log("Car to create : "+angular.toJson(car));
            return $resource(apiURL.baseURL+apiURL.carCreateEndpoint, 
                      {}, //{carId : "@id"}
                      {
                        carCreate : {method : "POST", params : {}, isArray : true } //headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                      }
                     );
        }
        
        this.putCar = function (car)
        {
            console.log("Update URI : ", apiURL.baseURL+apiURL.carUpdateEndpoint, car);
            return $resource(apiURL.baseURL+apiURL.carUpdateEndpoint, 
                      {carId : "@id"}, //
                      {
                        carUpdate : {method : "PUT", isArray : false }
                      }
                     );
        }
        

        return this;
    }
]);