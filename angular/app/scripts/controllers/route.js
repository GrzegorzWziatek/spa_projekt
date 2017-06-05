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

      routesService.post($scope.id, function (retPosts) {
        if (retPosts)
        {
          $scope.recRoute = retPosts;
        }
      });

    }

  }]);
