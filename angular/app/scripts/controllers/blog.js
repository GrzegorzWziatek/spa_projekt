'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('BlogCtrl',['$scope', 'blogService', function ($scope, blogService) {
    blogService.blog(function (retPosts) {
      if (retPosts)
      {
        $scope.blogS = retPosts;
      }
    });

  }]);
