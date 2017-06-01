'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('BlogCtrl',['$scope', 'blogService', 'userService', '$location', function ($scope, blogService, userService, $location) {
    if (userService.isLogged()) {
        blogService.blog(function (retPosts) {
          if (retPosts)
          {
            $scope.blogS = retPosts;
          }
        });

    }


  }]);
