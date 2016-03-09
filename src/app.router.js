'use strict';
angular.module('replace.application.name').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
