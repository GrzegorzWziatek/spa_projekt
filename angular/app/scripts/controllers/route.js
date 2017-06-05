'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RouteCtrl',['$scope', 'routesService', 'userService', '$routeParams', function ($scope, routesService, userService, $routeParams) {
    if (userService.isLogged()) {
      $scope.id = $routeParams.id;

      routesService.routE($scope.id, function (retRoute) {
        if (retRoute)
        {
          $scope.recRoute = retRoute.route;
          $scope.passengers = retRoute.passengers;
        }
      });

    }

  }]);
