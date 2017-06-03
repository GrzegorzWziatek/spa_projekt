'use strict';

describe('Service: blogitemService', function () {

  // load the service's module
  beforeEach(module('carpoolingApp'));

  // instantiate service
  var blogitemService;
  beforeEach(inject(function (_blogitemService_) {
    blogitemService = _blogitemService_;
  }));

  it('should do something', function () {
    expect(!!blogitemService).toBe(true);
  });

});
