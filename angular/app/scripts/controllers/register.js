'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RegisterCtrl', ['$scope','userService', 'registerService', '$location', function ($scope, userService, registerService, $location) {
  if (userService.isLogged()) {
      $location.path('/');
    }
  $scope.validate = function(form) {
    if (!form.$valid){
      return;
    }

    var enteredData = {
      email : $scope.email,
      password: $scope.password,
      login : $scope.login,
      car : $scope.car,
      plates: $scope.plates,
      desc: $scope.desc
    };
    registerService.register(enteredData, function(logged){
      if (logged){
        $location.path('/');
      }
    });

  };



  }]);
