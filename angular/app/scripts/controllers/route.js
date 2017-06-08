'use strict';
/*global google */

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RouteCtrl',['$scope', 'routesService', '$routeParams', 'NgMap', function ($scope, routesService, $routeParams, NgMap) {
    $scope.id = $routeParams.id;


    routesService.getRoute($scope.id, function (route, passengers) {

      if (route)
      {
        $scope.route = route;
        NgMap.getMap().then(function(map) {
          $scope.rq = {
            origin: $scope.route.route_from,
            destination: $scope.route.route_to,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };


        });

      }
      if (passengers){
        $scope.passengers = passengers;
      }
    });

    $scope.ical = function () {
      window.open( window.location.protocol + '//' + window.location.hostname + ':5000/routes/ical/'+$scope.id)
    };

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
