'use strict';

var carModule = angular.module("carModule", ["ngRoute"]);
carModule.constant("redirectedRoute", "http://localhost:8000/#!/cars");

var carConfig = carModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/cars", { templateUrl : "car/carView.html", controller : "CarController"})
    .when("/cars/create", { templateUrl : "car/carPostView.html", controller : "CarController"})
    .when("/cars/:id", { templateUrl : "car/carSpecificView.html", controller : "CarController"})
    .when("/cars/update/:carId", { templateUrl : "car/carUpdateView.html", controller : "CarController"})
}]);

carConfig.controller("CarController", ["$scope", "Car" , "$location", "redirectedRoute", "$routeParams", function($scope, Car, $location, redirectedRoute, $routeParams){
    
    if($routeParams.id === undefined && $location.path() == "/cars")
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
    
    if($routeParams.id && $routeParams.id.match(/\d+/))
    {
        console.log("Param Id : "+$routeParams.id);
        console.log("Param Id is undefined : ");
        console.log($routeParams.id === undefined);
        $scope.specificCar = Car.carSpecific().get({carId : $routeParams.id}, function(data){
            console.log("DATA : "+angular.toJson(data));
        });

        console.log("DATA specificCar: ", $scope.specificCar);
    }

    if($routeParams.id === undefined && $location.path() == "/cars/create")
    {
        console.log("Is /cars/create path : ");
        console.log($location.path() == "/cars/create");
        console.log($routeParams);
        $scope.carFormValues = {};
        console.log("/cars/create");
        $scope.submitCarCreateValues = function(car){
            console.log("YAWP");
            if($scope.carCreate.$valid)
            {
                console.log("VALID POSTED CAR FORM VALUES : ");
                console.log($scope.carCreate.$$controls);
                $scope.carFormValues = angular.copy(car);
                console.log("DATA TO POST");
                console.log($scope.carFormValues);
                var test = Car.postCar().save($scope.carFormValues);//.carCreate().$promise.then(function(data){
                    // console.log("Created car : "+angular.toJson(car));
                    for(var p in test)
                        console.log("p :::: "+p);
                //});
            }
            else
            {
                console.log("IS FORM VALID : "+$scope.carCreate.$valid);
            }
        }

        $scope.resetCarCreateForm = function(form){
            console.log("CAR FORM VALUES in resetCarCreateForm function: ");
            console.log($scope.car);
            console.log(form);
            console.log(form.$submitted);
            if(form)
            {
                form.$setPristine();
                form.$setUntouched();
            }
            console.log(form.$submitted);
            
            
            //Allow to reset form after submission
            $scope.carFormValues = {};
            $scope.car = angular.copy($scope.carFormValues);
            console.log($scope.car);
        }
    }
    
    if($routeParams.carId && /\/cars\/update\/\d+/.test($location.path()))
    {
        console.log("Is car update route");
        console.log(/\/cars\/update\/\d+/.test($location.path()));

        console.log("$scope : "+angular.toJson($scope));
        // for(var p in Car)
        //     console.log("p : "+p);

        
        $scope.updateCarSpecifc = Car.carSpecific({carId : $routeParams.carId}).get({carId : $routeParams.carId}, function(data){
            console.log("Found car to update : "+angular.toJson(data));
            //$scope.updateCarSpecifc = data;
        });//.$promise.then(function(response) {
        //     $scope.updateCarSpecifcTwo = response;
        //     console.log("Reponse", $scope.updateCarSpecifcTwo)
        // });
        
        console.log("Reponse2", $scope.updateCarSpecifcTwo)
        // console.log(updateCarSpecifc)
        console.log("HEY : " , $scope.updateCarSpecifc);

        $scope.submitCarUpdateValues = function(updatedCar){
            console.log("Updated car : ", updatedCar, updatedCar.id);
            let car = Car.putCar().carUpdate({carId : updatedCar.id}, updatedCar);
            console.log("Car updated : " , car);
            for(var p in Car)
                console.log("p : " + p);
        };
    }
}]);