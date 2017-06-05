'use strict';

/**
 * @ngdoc service
 * @name carpoolingApp.blogService
 * @description
 * # blogService
 * Service in the carpoolingApp.
 */
angular.module('carpoolingApp')
  .service('blogService', ['$rootScope', '$http', function ($rootScope, $http) {

    var base = window.location.protocol + '//' + window.location.hostname;

    this.blog = function (callback) {
      $http({
        method: 'GET',
        url: base + ':5000/blog'
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          $rootScope.posts = response.data.data.posts;
          for (var i = 0; i < $rootScope.posts.length; i++) {
            $rootScope.posts[i].dateObj = new Date($rootScope.posts[i].date);
          }
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
        url: base + ':5000/blog/save',
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

    this.getPost = function (id, callback) {

      $http({
        method: 'GET',
        url: base + ':5000/blog/post/' + id
      }).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          response.data.data.dateObj = new Date(response.data.data.date);
          callback(response.data.data);
        }
      }, function errorCallback() {
        window.alert('An error occured, please try again');
        callback(false);
      });

    };

  }]);
