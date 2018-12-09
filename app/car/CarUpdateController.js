"use strict";

let carUpdateModule = angular.module("CarUpdateModule", ["ngRoute"]);

let carUpdateConfig = carUpdateModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("!");

    $routeProvider.when("/cars/update/:carId", { templateUrl : "car/carUpdateView.html", controller : "CarUpdateController"});
}]);

carUpdateConfig.controller("CarUpdateController", ["$scope", "$location", "$routeParams","$rootScope", "Car", function($scope, $location, $routeParams, $rootScope, Car)
{

    $scope.updateCarSpecifc = Car.carSpecific({carId : $routeParams.carId}).get({carId : $routeParams.carId}, function(data)
    {
        console.log("Found car to update : "+angular.toJson(data));
        //$scope.updateCarSpecifc = data;
    },
    function(response)
    {
        if(response.status === 404)
        {
            console.log("Redirect to /cars/notFound : "+ $routeParams.carId);
            $rootScope.carIdNotFound = $routeParams.carId;
            $location.path("/cars/notFound");
            //Allows to go back in history
            $location.replace();
        }
    });//.$promise.then(function(response) {
    //     $scope.updateCarSpecifcTwo = response;
    //     console.log("Reponse", $scope.updateCarSpecifcTwo)
    // });
    
    console.log("Reponse2", $scope.updateCarSpecifcTwo)
    // console.log(updateCarSpecifc)
    console.log("HEY : " , $scope.updateCarSpecifc);

    $scope.submitCarUpdateValues = function(updatedCar){
        if($scope.carUpdate.$valid)
        {
            console.log("Is car update form's valid : ", $scope.carUpdate.$valid);
            console.log("Updated car : ", updatedCar, updatedCar.id);
            let car = Car.putCar().carUpdate({carId : updatedCar.id}, updatedCar);
            console.log("Car updated : " , car);
            $location.path("/cars/"+updatedCar.id);
        }
    };

    $scope.resetCarUpdateForm = function()
    {
        $scope.updateCarSpecifc = Car.carSpecific().carSpecific({carId : $routeParams.carId}, function (response)
        {
            console.log("Response return from webservice : ", response);
        });
        console.log("Form to reset with these initial value : ", $scope.updateCarSpecifc);
    }
}]);