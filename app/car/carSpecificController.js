"use strict";

let carSpecificModule = angular.module("CarSpecificModule", ["ngRoute"]);

let carSpecificConfig = carSpecificModule.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("!");

    $routeProvider.when("/cars/notFound", { templateUrl : "car/carNotFoundView.html", controller : "CarSpecificController"})
    .when("/cars/:id", {templateUrl : "car/carSpecificView.html", controller : "CarSpecificController"});
}]);

carSpecificConfig.controller("CarSpecificController", ["$rootScope", "$scope", "$location", "$routeParams","Car", function($rootScope, $scope, $location, $routeParams, Car){
    console.log("Param Id : "+$routeParams.id);
    
    $scope.specificCar = Car.carSpecific().get({carId : $routeParams.id}, 
        function(data)
        {
            console.log("Successfully recovered specific  car data : "+angular.toJson(data));
        }, 
        function(response)
        {
            if(response.status === 404)
            {
                console.log("Car not found  : "+$routeParams.id);
                console.log("Redirect to  : /cars/notFound");
                $location.path("/cars/notFound");
                $rootScope.carIdNotFound = $routeParams.id;
            } 
        });

}])
