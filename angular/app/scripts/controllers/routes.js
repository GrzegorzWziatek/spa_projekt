'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RoutesCtrl',['$scope', 'routesService','userService', '$location', function ($scope, routesService, userService, $location) {
    //if (userService.isLogged()) {
      routesService.routeS(function (retRoutes) {
        if (retRoutes)
        {
          $scope.recRoutes = retRoutes;
        }
      });
    //}
  }]);
