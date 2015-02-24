'use strict';

describe('Directive: dnaviewerDirective', function () {

  // load the directive's module
  beforeEach(module('dnaviewerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnaviewer-directive></dnaviewer-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dnaviewerDirective directive');
  }));
});
