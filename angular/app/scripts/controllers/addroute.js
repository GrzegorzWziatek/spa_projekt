'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:AddrouteCtrl
 * @description
 * # AddrouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('AddrouteCtrl', ['$scope', 'routesService', 'userService', '$location', function ($scope, routesService, userService, $location) {

    $scope.validate = function (form) {
      if (!form.$valid) {
        return;
      }

      var enteredData = {
        routeFrom: $scope.routeFrom,
        routeTo: $scope.routeTo,
        date: $scope.date,
        maxPassengers: $scope.maxPassengers,
        price: $scope.price,
        text: $scope.text
      };

      routesService.save(enteredData, function (id) {
        if (id) {
          var path = '/route/' + id;
          $location.path(path);
        }
      });

    };


  }]);
