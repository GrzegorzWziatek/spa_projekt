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

          for (var i = 0; i < response.data.data.routes.length; i++) {
            response.data.data.routes[i].dateObj = new Date(response.data.data.routes[i].date);
          }

          callback(response.data.data.routes);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };

    this.getRoute = function (data, callback) {
      $http({
        method: 'GET',
        url: base +':5000/routes/' + data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          var route = response.data.data.route;
          route.dateObj = new Date(route.date);
          callback(route, response.data.data.passengers);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };


    this.joinRoute = function (data, callback) {
      $http({
        method: 'POST',
        url: base +':5000/routes/join',
        data: {
          route_id : data
        }
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          callback(true);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };

    this.leaveRoute = function (data, callback) {
      $http({
        method: 'POST',
        url: base +':5000/routes/leave',
        data: {
          route_id : data
        }
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          callback(true);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };

    this.save = function (data, callback) {
      $http({
        method: 'POST',
        url: base + ':5000/routes/add',
        data: data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          callback(response.data.data.id);
        } else {
          window.alert(response.data.data.message);
          callback(false);
        }

      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };
}]);
