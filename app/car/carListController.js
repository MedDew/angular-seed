"use strict";

let carListModule = angular.module("CarListModule", ["ngRoute"]);
carListModule.constant("redirectedRoute", "http://localhost:8000/#!/cars");

let carListConfig = carListModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationPovider){
    $locationPovider.hashPrefix("!");
    $routeProvider.when("/cars", { templateUrl : "car/carView.html", controller : "CarListController"});
}]);

carListConfig.controller("CarListController",["$scope", "$location","Car", function($scope, $location, Car){
    $scope.cars = Car.carList().carList();

    $scope.getSpecificCar = function(id){
        console.log($location.url().replace(/%2F/g, "/"));
        $location.url("/cars/"+id);
    }
}]);