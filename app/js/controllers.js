'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngUpload']).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {
	  
  }])
  .controller("WeatherCtrl", function ($scope, weatherService){
    //Executes when the controller is created
    $scope.Weather = {};
    $scope.selectedCity = 'Cambridge';
    $scope.getWeather = function(){
        weatherService.getWeather($scope.selectedCity).then(
        		function (data) {
                    $scope.Weather = data;
                });
    }
    $scope.getWeather();
  })

  .controller("UsersCtrl", function ($scope, $location, usersService){
    //Executes when the controller is created
    $scope.getUsers = function(){
    	usersService.getUsers().then(
        		function (data) {
        			$scope.users = data;
                });
    }
    $scope.getUsers();
    $scope.addNewUser = function(user){
        usersService.addNewUser(user).then(function(user) {
        	$scope.getUsers();
        	$location.path('/users');
        });
    }
  })
  .controller("UserEditCtrl", ['$scope','$location', '$routeParams','usersService', function($scope, $location, $routeParams, usersService){
	  //Executes when the controller is created
	  var userId = $routeParams.userId;
	  $scope.genders = [{value:'Male', text:'Male'},
	                    {value:'Female', text:'Female'}];
	  console.log("In edit controller");
	  var user = {id: userId};
	  usersService.editUser(user).then(function(user) {
		  var original = user;
		  $scope.user = original;
      });
	  $scope.updateUser = function(user){
		  user.put().then(function() {
			  console.log("success put");
			  $location.path('/users');
		  });
	  }
	  //$scope.getUsers();
	  }])
  .controller("UserDeleteCtrl", ['$scope','$location', '$routeParams','usersService', function($scope, $location, $routeParams, usersService){
	  //Executes when the controller is created
	  console.log("In delete controller");
	  var userId = $routeParams.userId;
	  var user = {id: userId};
	  usersService.removeUser(user).then(function(user) {
		  var original = user;
		  original.remove().then(function() {
			  $location.path('/users');
		  })
      });
	  //$scope.getUsers();
	  }])
.controller('uploadResume', function ($scope, usersService) {
      $scope.startUploading = function() {
        console.log('uploading....')
      };
      $scope.uploadComplete = function (content) {
        console.log("In uploadResume controller");
        if (content) console.log(content);
          $scope.response = content; // Presumed content is a json string!
          $scope.response.style = {
              color: $scope.response.color,
              "font-weight": "bold"
          };

          // Clear form (reason for using the 'ng-model' directive on the input elements)
          $scope.fullname = '';
          $scope.gender = '';
          $scope.color = '';
          // Look for way to clear the input[type=file] element
        }
      });

