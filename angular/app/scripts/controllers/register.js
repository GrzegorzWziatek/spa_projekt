'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('RegisterCtrl', ['userService', '$location', function (userService, $location) {

  if (userService.isLogged()) {
      $location.path('/');
    }




  }]);
