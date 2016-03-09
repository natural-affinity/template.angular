'use strict';

angular.module('template.sidebar').directive('templateSidebar', function () {
  return {
    restrict: 'E',
    templateUrl: 'navigation/sidebar.template.html'
  };
});
