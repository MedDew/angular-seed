'use strict';

angular.module("carIconSuccessDirectiveModule",[])
.directive("carIconSuccessDirective", function(){
    return {
        restrict : "E",
        templateUrl : "car/carIconSuccessView.html"
    }
})