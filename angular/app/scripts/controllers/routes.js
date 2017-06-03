'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RoutesCtrl
 * @description
 * # RoutesCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RoutesCtrl',['$scope', 'routesService','userService', '$location', '$rootScope', function ($scope, routesService, userService, $location, $rootScope) {
    //if (userService.isLogged()) {
      routesService.getroutes(function (retRoutes) {
        if (retRoutes)
        {
          $scope.recReoutes = retRoutes;
        }
      });
    //}
  }]);
