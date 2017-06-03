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
 //   if (userService.isLogged()) {
        blogService.blog(function (retPosts) {
          if (retPosts)
          {
            $scope.blogS = retPosts;
          }
        });

        $scope.validate = function(form) {
          if (!form.$valid) {
           return;
          }

         var enteredData = {
           title: $scope.title,
           text: $scope.text
          };
            blogService.save(enteredData, function(saved) {
            if (saved){
              $location.path('/#blog');
            }
          });

        };
  //  }

  }]);
