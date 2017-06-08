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
        route_from: $scope.route_from,
        route_to: $scope.route_to,
        date: $scope.date.format("YYYY-MM-DD HH:mm:ss"),
        max_passengers: $scope.max_passengers,
        desc_route: $scope.desc_route,
        price: $scope.price
      };

      routesService.save(enteredData, function (id) {
        if (id) {
          var path = '/route/' + id;
          $location.path(path);
        }
      });

    };

    $scope.options = {
      format: "YYYY-MM-DD HH:mm:ss"
    };


  }]);
