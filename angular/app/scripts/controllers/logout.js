'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('LogoutCtrl', ['$location', 'userService', function ($location, userService) {
    userService.logout();
    $location.path('/');
  }]);
