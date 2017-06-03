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

    this.save = function (data, callback) {
      $http({
        method: 'POST',
        url: base +':5000/blog/save',
        data: data
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          $rootScope.blog_id = response.data.data.id;
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

  }]);
