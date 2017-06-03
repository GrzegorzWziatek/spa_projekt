'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:BlogitemCtrl
 * @description
 * # BlogitemCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('BlogitemCtrl',['$scope', 'blogitemService', 'userService', '$routeParams', function ($scope, blogitemService, userService, $routeParams) {
    if (userService.isLogged()) {
    $scope.id = $routeParams.id;


    blogitemService.posts($scope.id, function (retPosts) {
      if (retPosts)
      {
        $scope.postS = retPosts;
      }
    });

    }

  }]);

