'use strict';

describe('Controller: UsereditCtrl', function () {

  // load the controller's module
  beforeEach(module('carpoolingApp'));

  var UsereditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsereditCtrl = $controller('UsereditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


});
