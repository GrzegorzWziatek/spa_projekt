'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RoutesCtrl',['$scope', 'routesService', function ($scope, routesService) {
    //if (userService.isLogged()) {
      routesService.routeS(function (retRoutes) {
        if (retRoutes)
        {
          $scope.recRoutes = retRoutes;
        }
      });
    //}
  }]);
