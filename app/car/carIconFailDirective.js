'use strict';

angular.module("carIconFailDirectiveModule",[])
.directive("carIconFailDirective", function(){
    return {
        restrict : "E",
        templateUrl : "car/carIconFailView.html"
    }
})