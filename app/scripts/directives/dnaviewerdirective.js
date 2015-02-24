/* jshint ignore:start */
'use strict';

/**
 * @ngdoc directive
 * @name dnaviewerApp.directive:dnaviewerDirective
 * @description
 * # dnaviewerDirective
 */
angular.module('dnaviewerApp')
  .directive('dna', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
		sequencelength : '@',
		radius : '@'
	  },
      link: function postLink(scope, element, attrs) {
        element.text('this is the dnaviewerDirective directive');
      }
    };
  });
/* jshint ignore:end */