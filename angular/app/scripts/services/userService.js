'use strict';
/*jslint bitwise: true */

/**
 * @ngdoc service
 * @name carpoolingApp.userService
 * @description
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('userService',['$rootScope', '$http', function ($rootScope, $http) {

    var base = window.location.protocol + '//' + window.location.hostname;

    this.login = function (data, callback) {

      $http({
        method: 'POST',
        url: base +':5000/user/login',
        data: data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          $rootScope.userId = response.data.data.user;
          $rootScope.userLogin = response.data.data.login;
          $rootScope.userLogged = true;
          callback(true);
        } else {
          window.alert(response.data.data.message);
          callback(false);
        }

      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });

    };

    this.isLogged = function () {

      if (!$rootScope.checkedLogin) {
        $http({
          method: 'GET',
          url: base +':5000/user/logged'
        }).then(function successCallback(response) {
          var logged = response.data.logged;
          var uid = response.data.uid;

          $rootScope.userId = uid;
          $rootScope.userLogged = logged;
          $rootScope.checkedLogin = true;
          return logged;
        }, function errorCallback() {
          return false;
        });
        return false;
      } else {
        return $rootScope.userLogged;
      }

    };


    this.logout = function () {
      $http({
        method: 'GET',
        url: base +':5000/user/logout'
      }).then(function successCallback() {
        $rootScope.userId = '';
        $rootScope.userLogged = false;
        $rootScope.userLogin = '';
      }, function errorCallback() {
        window.alert('An error occured, please try again');
      });

    };

  }]);
