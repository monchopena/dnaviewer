'use strict';

describe('Service: Dnaviewerservice', function () {

  // load the service's module
  beforeEach(module('dnaviewerApp'));

  // instantiate service
  var Dnaviewerservice;
  beforeEach(inject(function (_Dnaviewerservice_) {
    Dnaviewerservice = _Dnaviewerservice_;
  }));

  it('should do something', function () {
    expect(!!Dnaviewerservice).toBe(true);
  });

});
