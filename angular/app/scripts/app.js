'use strict';

/**
 * @ngdoc overview
 * @name carpoolingApp
 * @description
 * # carpoolingApp
 *
 * Main module of the application.
 */
var app = angular
  .module('carpoolingApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularTrix'
  ]);

  app.config(function ($routeProvider, $httpProvider) {
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/addBlog', {
        templateUrl: 'views/addblog.html',
        controller: 'AddblogCtrl',
        controllerAs: 'addBlog'
      })
      .when('/addRoute', {
        templateUrl: 'views/addroute.html',
        controller: 'AddrouteCtrl',
        controllerAs: 'addRoute'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.withCredentials = true;
  });

  app.run(['userService', function(userService) {
    userService.isLogged();
  }]);
