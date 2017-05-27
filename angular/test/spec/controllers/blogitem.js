'use strict';

describe('Controller: BlogitemCtrl', function () {

  // load the controller's module
  beforeEach(module('carpoolingApp'));

  var BlogitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogitemCtrl = $controller('BlogitemCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlogitemCtrl.awesomeThings.length).toBe(3);
  });
});
