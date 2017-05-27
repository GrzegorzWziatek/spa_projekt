"use strict";angular.module("carpoolingApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/blog",{templateUrl:"views/blog.html",controller:"BlogCtrl",controllerAs:"blog"}).when("/blogItem/:id",{templateUrl:"views/blogitem.html",controller:"BlogitemCtrl",controllerAs:"blogItem"}).otherwise({redirectTo:"/"})}]),angular.module("carpoolingApp").controller("MainCtrl",function(){console.log("main app")}),angular.module("carpoolingApp").service("myservice",function(){this.myFunction=function(){console.log("myFunction")}}),angular.module("carpoolingApp").controller("BlogCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("carpoolingApp").controller("BlogitemCtrl",["$scope","$routeParams",function(a,b){a.id=b.id,alert(a.id)}]),angular.module("carpoolingApp").run(["$templateCache",function(a){a.put("views/blog.html","<p>This is the blog view.</p>"),a.put("views/blogitem.html","<p>This is the blogItem view.</p>"),a.put("views/main.html","main app")}]);