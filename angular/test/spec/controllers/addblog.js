'use strict';

describe('Controller: AddblogCtrl', function () {

  // load the controller's module
  beforeEach(module('carpoolingApp'));

  var AddblogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddblogCtrl = $controller('AddblogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddblogCtrl.awesomeThings.length).toBe(3);
  });
});
