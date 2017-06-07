'use strict';

describe('Controller: AddrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('carpoolingApp'));

  var AddrouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddrouteCtrl = $controller('AddrouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddrouteCtrl.awesomeThings.length).toBe(3);
  });
});
