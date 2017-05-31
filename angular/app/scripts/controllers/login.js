'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('LoginCtrl',['$scope', 'userService', '$location', function ($scope, userService, $location) {
    // redirect if logged
    if (userService.isLogged()) {
      $location.path('/');
    }

    $scope.validate = function(form) {
      // wyjdz jak nie zwalidowany for
      if (!form.$valid) {
        return;
      }

      var enteredData = {
        email : $scope.email,
        password: $scope.password
      };

      userService.login(enteredData, function(logged) {
        if (logged){
        $location.path('/');
        }
      })

    };


  }]);
