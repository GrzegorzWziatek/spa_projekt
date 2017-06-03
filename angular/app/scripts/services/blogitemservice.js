'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.blogitemService
 * @description
 * # blogitemService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('blogitemService',['$rootScope', '$http', function ($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var base = window.location.protocol + '//' + window.location.hostname;
    this.posts = function (data, callback) {
      $http({
        method: 'GET',
        url: base +':5000/blog/post/' + data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          $rootScope.posts = response.data.data;
          callback($rootScope.posts);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };
  }]);
