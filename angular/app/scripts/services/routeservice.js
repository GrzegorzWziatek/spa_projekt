'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.routeService
 * @description
 * # routeService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('routeService',['$rootScope', '$http', function ($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var base = window.location.protocol + '//' + window.location.hostname;
    this.post = function (data, callback) {
      $http({
        method: 'GET',
        url: base +':5000/routes/' + data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          $rootScope.post = response.data.data;
          callback($rootScope.post);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };
  }]);
