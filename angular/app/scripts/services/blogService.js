'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.blogService
 * @description
 * # blogService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('blogService',['$rootScope', '$http', function ($rootScope, $http) {

    var base = window.location.protocol + '//' + window.location.hostname;

    this.blog = function (callback) {
      $http({
        method: 'GET',
        url: base +':5000/blog'
      }).then(function successCallback(response) {
        if (response.data.status === 'OK'){
          $rootScope.posts = response.data.data.posts;
          callback($rootScope.posts);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });
    };

  }]);
