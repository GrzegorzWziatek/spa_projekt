'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:BlogitemCtrl
 * @description
 * # BlogitemCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('BlogitemCtrl',['$scope', 'blogService', 'userService', '$routeParams', function ($scope, blogService, userService, $routeParams) {
    if (userService.isLogged()) {
    $scope.id = $routeParams.id;


    blogService.getPost($scope.id, function (retPosts) {
      if (retPosts)
      {
        $scope.post = retPosts;
      }
    });

    }

  }]);

