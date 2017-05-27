'use strict';

/**
 * @ngdoc function
 * @name carpoolingApp.controller:BlogitemCtrl
 * @description
 * # BlogitemCtrl
 * Controller of the carpoolingApp
 */
angular.module('carpoolingApp')
  .controller('BlogitemCtrl', function ($scope, $routeParams) {

    $scope.id = $routeParams.id;

    alert($scope.id);


  });
