'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('MainCtrl', ['userService', '$scope', function (userService, $scope) {
    userService.isLogged();
    console.log($scope);

  }]);
