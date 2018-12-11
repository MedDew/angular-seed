'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    console.log("scope : ", scope);
    console.log("elm : ", elm);
    console.log("attrs : ", attrs);
    console.log("version : ", version);
    elm.text(version);
  };
}]);
