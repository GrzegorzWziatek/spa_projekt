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
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/userEdit', {
        templateUrl: 'views/useredit.html',
        controller: 'UsereditCtrl',
        controllerAs: 'userEdit'
      })
      .when('/routes', {
        templateUrl: 'views/routes.html',
        controller: 'RoutesCtrl',
        controllerAs: 'routes'
      })
      .when('/route/:id', {
        templateUrl: 'views/route.html',
        controller: 'RouteCtrl',
        controllerAs: 'route'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
