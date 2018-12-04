'use strict';

var carModule = angular.module("carModule", ["ngRoute"]);
carModule.constant("redirectedRoute", "http://localhost:8000/#!/cars");

var carConfig = carModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/cars", { templateUrl : "car/carView.html", controller : "CarController"})
    .when("/cars/:id", { templateUrl : "car/carSpecificView.html", controller : "CarController"})
}]);

carConfig.controller("CarController", ["$scope", "Car" , "$location", "redirectedRoute", "$routeParams", function($scope, Car, $location, redirectedRoute, $routeParams){
    
    if($routeParams.id === undefined)
    {
        $scope.cars = Car.carList().query();
        console.log(Car);
        for(var p in Car)
        {
            console.log("p => "+p);
        }

        $scope.getSpecificCar = function(id){
            console.log("absUrl() : "+$location.absUrl());
            console.log("path() : "+$location.path());
            console.log("Go to URL : "+redirectedRoute+"/"+id);
            // var test = $location.url(decodeURIComponent(redirectedRoute+"/"+id));
            // console.log(test+" ==> "+location);
            console.log($location.url().replace(/%2F/g, "/"));
            $location.url("/cars/"+id);
            console.log($location.url("/cars/"+id));
            // return $location.url(redirectedRoute+"/"+id).replace(/%2F/gi, "/");
        }
    }
    
    if($routeParams.id)
    {
        console.log("Param Id : "+$routeParams.id);
        console.log("Param Id is undefined : ");
        console.log($routeParams.id === undefined);
        $scope.specificCar = Car.carSpecific().get({carId : $routeParams.id}, function(data){
            console.log("DATA : "+angular.toJson(data));
        });
    }
}]);