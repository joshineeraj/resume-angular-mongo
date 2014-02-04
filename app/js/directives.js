'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive( 'capitalize', function() {
	  return {
		     restrict: 'E',
		     template: '{{anyelement|uppercase}}'
		   }
  })
  .directive( 'reverse', function() {
	  return {
		     restrict: 'E',
		     template: "{{anyelement.split('').reverse().join('')}}"
		   }
  })
  
  .directive( 'wish', function() {
	  return {
		     restrict: 'E',
		     link:function(scope, element, attrs) {
		       var greet = attrs.greet;
		       var tag = '';
		       if ((greet !== null) && (greet !== undefined) && (greet !== '')) {
		    	   tag = '<embed src="http://apps.afterbtech.com/swf/'+greet+'.swf" width="550" height="400" wmode="transparent" />';
		       }
		       element.append(tag);
		     }
		   }
  })
.directive('sameAs', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (viewValue === scope[attrs.sameAs]) {
					ctrl.$setValidity('sameAs', true);
					return viewValue;
				} else {
					ctrl.$setValidity('sameAs', false);
					return undefined;
				}
			})
		}
	}
});