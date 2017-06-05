'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RouteCtrl',['$scope', 'routesService', 'geo', '$routeParams', function ($scope, routesService, geo, $routeParams) {
    $scope.id = $routeParams.id;


    routesService.getRoute($scope.id, function (route) {
      if (route)
      {
        $scope.route = route;
        geo.getAddress(route.route_from, function (data) {
          $scope.from = data;
        });

        geo.getAddress(route.route_to, function (data) {
          $scope.to = data;
        });
      }
    });



  }]);
