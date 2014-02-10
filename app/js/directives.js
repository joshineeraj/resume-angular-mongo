'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('passwordMatch', [function() {
	 return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs, control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
                
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                console.log(e1==e2);
                return e1 == e2;
                
            };
            scope.$watch(checker, function () {
                control.$setValidity("unique", true);
            });
        }
    };
}]);

