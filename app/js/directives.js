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

.directive('passwordMatch', [function() {
	 return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
}]);

