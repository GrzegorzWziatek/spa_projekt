'use strict';

describe('Service: routesService', function () {

  // load the service's module
  beforeEach(module('carpoolingApp'));

  // instantiate service
  var routesService;
  beforeEach(inject(function (_routesService_) {
    routesService = _routesService_;
  }));

  it('should do something', function () {
    expect(!!routesService).toBe(true);
  });

});
