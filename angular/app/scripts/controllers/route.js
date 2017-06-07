'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RouteCtrl',['$scope', 'routesService', 'geo', '$routeParams', '$location', function ($scope, routesService, geo, $routeParams, $location) {
    $scope.id = $routeParams.id;


    routesService.getRoute($scope.id, function (route, passengers) {
    console.log(arguments);
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
      if (passengers){
        $scope.passengers = passengers;
      }
    });


    $scope.join = function() {
      routesService.joinRoute($scope.id, function(done) {
        if (done) {
          window.location.reload();
        }
      });
    };

    $scope.leave = function() {
      routesService.leaveRoute($scope.id, function(done) {
        if (done) {
          window.location.reload();
        }
      });
    };



  }]);
