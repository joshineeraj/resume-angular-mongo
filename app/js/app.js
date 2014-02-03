'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'restangular'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/weather', {templateUrl: 'partials/weather.html', controller: 'WeatherCtrl'});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'UsersCtrl'});
  $routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: 'UsersCtrl'});
  $routeProvider.when('/user/edit/:userId/', {templateUrl: 'partials/editprofile.html', controller: 'UserEditCtrl'});
  $routeProvider.when('/user/delete/:userId/', {templateUrl: 'partials/users.html', controller: 'UserDeleteCtrl'});
  $routeProvider.when('/thankyou', {templateUrl: 'partials/thankyou.html'});
  $routeProvider.otherwise({redirectTo: '/users'});
}])
.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:3000/');
 // RestangularProvider.setDefaultRequestParams({ apiKey: '83nxC8BfkaXHn-B1iM3Dc-t-MpG_Zi85' });
  //RestangularProvider.setRestangularFields({ id: '_id.$oid' });
  RestangularProvider.setRestangularFields({ id: "_id" });
  RestangularProvider.setDefaultHttpFields({
	  withCredentials: true,
	  useXDomain : true
  });
  RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
      
	  if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    });
  
});