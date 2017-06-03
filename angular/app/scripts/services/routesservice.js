'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.routesService
 * @description
 * # routesService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('routesService', ['$rootScope', '$http', function ($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var base = window.location.protocol + '//' + window.location.hostname;

    this.getroutes = function (callback) {
      $http({
        method: 'GET',
        url: base + ':5000/routes'
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          $rootScope.routes = response.data.data.routes;
          callback($rootScope.routes);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    }
}]);
