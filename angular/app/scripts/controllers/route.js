'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RouteCtrl
 * @description
 * # RouteCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RouteCtrl',['$scope', 'routeService', 'userService', '$routeParams', function ($scope, routeService, userService, $routeParams) {
    if (userService.isLogged()) {
      $scope.id = $routeParams.id;

      routeService.post($scope.id, function (retPosts) {
        if (retPosts)
        {
          $scope.recRoute = retPosts;
        }
      });

    }

  }]);
