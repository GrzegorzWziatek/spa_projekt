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

    this.routeS = function (callback) {
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

    this.routE = function (data, callback) {
      $http({
        method: 'GET',
        url: base +':5000/routes/' + data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          var receivedData = {
            route : response.data.data.route,
            passengers: response.data.data.passengers
          };
          $rootScope.route = response.data.data.route;
          $rootScope.passengers = response.data.data.passengers;
          callback(receivedData);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };
}]);
