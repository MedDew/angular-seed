"use strict";

let carCreateModule = angular.module("CarCreateModule", ["ngRoute"]);

let carCreateConfig = carCreateModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("!");

    $routeProvider.when("/cars/create", {templateUrl : "car/carPostView.html", controller : "CarCreateController"})
}]);

carCreateConfig.controller("CarCreateController", ["$scope", "$location", "Car", function($scope, $location, Car){
    
    $scope.carFormValues = {};
    $scope.submitCarCreateValues = function(car)
    {
        if($scope.carCreate.$valid)
        {
            console.log("VALID POSTED CAR FORM VALUES : ");
            console.log($scope.carCreate.$$controls);

            $scope.carFormValues = angular.copy(car);
            
            console.log("DATA TO POST");
            console.log($scope.carFormValues);
            Car.postCar().carCreate($scope.carFormValues).$promise.then(
                function(response)
                {
                        
                    console.log("p.response : ", response.routeValues);
                    console.log("Redirect to /cars/"+response.routeValues.id);
                    $location.path("cars/"+response.routeValues.id);
                },
                function(response)
                {
                    alert("An error occured while creating a car");
                }
            );//save($scope.carFormValues)
            
        }   
        else
        {
            console.log("IS FORM VALID : "+$scope.carCreate.$valid);
        }
    }

    $scope.resetCarCreateForm = function(form)
    {
        console.log("CAR FORM VALUES in resetCarCreateForm function: ");
        if(form)
        {
            form.$setPristine();
            form.$setUntouched();
        }
        
        
        //Allow to reset form after submission
        $scope.carFormValues = {};
        $scope.car = angular.copy($scope.carFormValues);
        console.log($scope.car);
    }
}]);