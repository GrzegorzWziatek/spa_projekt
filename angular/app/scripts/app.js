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
      .when('/zad2', {
        templateUrl: 'views/zad2.html',
        controller: 'Zad2Ctrl',
        controllerAs: 'zad2'
      })
      .when('/zad3', {
        templateUrl: 'views/zad3.html',
        controller: 'Zad3Ctrl',
        controllerAs: 'zad3'
      })
      .when('/zad4', {
        templateUrl: 'views/zad4.html',
        controller: 'Zad4Ctrl',
        controllerAs: 'zad4'
      })
      .when('/zad5', {
        templateUrl: 'views/zad5.html',
        controller: 'Zad5Ctrl',
        controllerAs: 'zad5'
      })
      .when('/zad6', {
        templateUrl: 'views/zad6.html',
        controller: 'Zad6Ctrl',
        controllerAs: 'zad6'
      })
      .when('/zad21', {
        templateUrl: 'views/zad21.html',
        controller: 'Zad21Ctrl',
        controllerAs: 'zad21'
      })
      .when('/zad22', {
        templateUrl: 'views/zad22.html',
        controller: 'Zad22Ctrl',
        controllerAs: 'zad22'
      })
      .when('/zad23', {
        templateUrl: 'views/zad23.html',
        controller: 'Zad23Ctrl',
        controllerAs: 'zad23'
      })
      .when('/zad31', {
        templateUrl: 'views/zad31.html',
        controller: 'Zad31Ctrl',
        controllerAs: 'zad31'
      })
      .when('/zad32', {
        templateUrl: 'views/zad32.html',
        controller: 'Zad32Ctrl',
        controllerAs: 'zad32'
      })
      .when('/zad33', {
        templateUrl: 'views/zad33.html',
        controller: 'Zad33Ctrl',
        controllerAs: 'zad33'
      })
      .when('/zad34', {
        templateUrl: 'views/zad34.html',
        controller: 'Zad34Ctrl',
        controllerAs: 'zad34'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
