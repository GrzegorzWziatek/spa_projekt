'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:AddblogCtrl
 * @description
 * # AddblogCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('AddblogCtrl', ['$scope', 'blogService', 'userService', '$location', function ($scope, blogService, userService, $location) {

    $scope.validate = function (form) {
      if (!form.$valid) {
        return;
      }

      var enteredData = {
        title: $scope.title,
        text: $scope.text
      };

      blogService.save(enteredData, function (id) {
        if (id) {
          var path = '/blogItem/' + id;
          $location.path(path);
        }
      });

    };


  }]);
