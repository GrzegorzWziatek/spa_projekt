'use strict';

/**
 * @ngdoc overview
 * @name carpoolingApp
 * @description
 * # carpoolingApp
 *
 * Main module of the application.
 */
angular
  .module('carpoolingApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'blog'
      })
      .when('/blogItem/:id', {
        templateUrl: 'views/blogitem.html',
        controller: 'BlogitemCtrl',
        controllerAs: 'blogItem'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
