'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.registerService
 * @description
 * # registerService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('registerService', ['$http', '$rootScope' function ($http, $rootScope) {

    var base = window.location.protocol + '//' + window.location.hostname;

    this.register = function (data, callback) {

      $http({
        method: 'POST',
        url: base +':5000/user/register',
        data: data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          console.log(response);
          $rootScope.userId = response.data.data.user;
          $rootScope.userLogin = response.data.data.login;
          $rootScope.userLogged = true;
          callback(true)
        } else {
          window.alert('An error occured, please try again: ' + response.data.data.message);
          callback(false)
        }

      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });

    };



  });
