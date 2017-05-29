'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('LoginCtrl', function ($scope) {

    $scope.validate = function(form) {
      console.log(form);
      // wyjdz jak nie zwalidowany for
      if (!form.$valid) {
        return;
      }

      //

      var enteredData = {
        email : $scope.email,
        password: $scope.password
      };

      console.log(enteredData);
      debugger;
    }


  });
