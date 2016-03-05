'use strict';
angular
  .module('replace.application.name', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'index.html'
        })
        .otherwise({
          redirectTo: '/'
        });
  }]);
