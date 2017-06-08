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

          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();

          var request = {
            origin: $scope.route.route_from,
            destination: $scope.route.route_to,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              directionsDisplay.setMap(map);
            } else {
              alert('Google route unsuccesfull!');
            }
          });

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
