'use strict';

var carModule = angular.module("carModule", ["ngRoute"]);
carModule.constant("redirectedRoute", "http://localhost:8000/#!/cars");

var carConfig = carModule.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/cars", { templateUrl : "car/carView.html", controller : "CarController"})
    .when("/cars/create", { templateUrl : "car/carPostView.html", controller : "CarController"})
    .when("/cars/notFound", { templateUrl : "car/carNotFoundView.html", controller : "CarController"})
    .when("/cars/:id", { templateUrl : "car/carSpecificView.html", controller : "CarController"})
    .when("/cars/update/:carId", { templateUrl : "car/carUpdateView.html", controller : "CarController"})
    .when("/cars/delete/:carId", { templateUrl : "car/carDeleteView.html", controller : "CarController"})
}]);

carConfig.controller("CarController", ["$scope", "Car" , "$location", "redirectedRoute", "$routeParams", "$rootScope", "$window", function($scope, Car, $location, redirectedRoute, $routeParams, $rootScope, $window){
    
    if($routeParams.id === undefined && /\/cars$/.test($location.path()))
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
        
        $scope.deleteCar = function(id, $event){
            console.log("DELETE THIS CAR ==> "+id);
            //prevent clcick event from bubbling to the parent
            $event.stopPropagation();
            Car.deleteCar().carDelete({id : id});

            //Re initialize  both the service and the controller
            $window.location.reload();
        }
    }
    
    console.log("YAWP : ", /\/cars\/\d+/.test($location.path()));
    if($routeParams.id && /^\/cars\/\d+$/.test($location.path()))//$routeParams.id.match(/\d+/)
    {
        console.log("Param Id : "+$routeParams.id);
        console.log("Param Id is undefined : ");
        console.log($routeParams.id === undefined);
        $scope.specificCar = Car.carSpecific().get({carId : $routeParams.id}, function(data){
            console.log("DATA : "+angular.toJson(data));
        }, function(response){
           if(response.status === 404 )
           {
                console.log("Car not found  : "+$routeParams.id);
                $location.path("/cars/notFound");
                $rootScope.carIdNotFound = $routeParams.id;
           } 
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
        },
        function(response){
            console.log("Typeof response : "+typeof response);
            console.log("response : ", response);
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
        $scope.checkFieldValidity = function(formName)
        {
            console.log("Form",formName);
            console.log("Is unTouched",formName.$untouched);
            console.log("Is valid",formName.$valid);
            console.log("Is Touched",$scope.carUpdate.cBrand.$touched);
            switch(formName.$name)
            {
                case "cBrand" :
                    if(formName.$valid)
                    {
                        $scope.cBrandValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.cBrandValidCSSClass = "is-danger";
                    }
                break;
                case "model" :
                    if(formName.$valid)
                    {
                        $scope.modelValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.modelValidCSSClass = "is-danger";
                    }
                break;
                case "price" :
                    if(formName.$valid)
                    {
                        $scope.priceValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.priceValidCSSClass = "is-danger";
                    }
                break;
                case "horsePower" :
                    if(formName.$valid)
                    {
                        $scope.horsePowerValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.horsePowerValidCSSClass = "is-danger";
                    }
                break;
                case "nbSeats" :
                    if(formName.$valid)
                    {
                        $scope.nbSeatsValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.nbSeatsValidCSSClass = "is-danger";
                    }
                break;
                case "weight" :
                    if(formName.$valid)
                    {
                        $scope.weightValidCSSClass = "is-success";
                    }
                    else
                    {
                        $scope.weightValidCSSClass = "is-danger";
                    }
                break;
            }
            
        }

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
                for(var p in Car)
                    console.log("p : " + p);
                $location.path("/cars/"+updatedCar.id);
            }
        };

        $scope.resetCarUpdateForm = function(){
            $scope.updateCarSpecifc = Car.carSpecific().carSpecific({carId : $routeParams.carId}, function (response){
                console.log("Response return from webservice : ", response);
            });
            console.log("Form to reset with these initial value : ", $scope.updateCarSpecifc);
        }
    }

    if($routeParams.carId  && /^\/cars\/delete\/\d+$/.test($location.path()))
    {
        console.log($location.path());
        $scope.carToDelete = Car.carSpecific().get({carId : $routeParams.carId});
        
        $scope.deleteCar = function(){
            console.log("DELETE THIS CAR ==> "+$routeParams.carId);

            Car.deleteCar().carDelete({id : $routeParams.carId});
        }
    }
}]);