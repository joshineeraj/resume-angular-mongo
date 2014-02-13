'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngUpload'])
	.controller("UsersCtrl", function ($scope,$rootScope, $location, usersService){
		//Executes when the controller is created
		$scope.getUsers = function(){
			usersService.getUsers().then(
				function (data) {
					if ($rootScope.is_logged == true)
						{
							$scope.users = data;
						}
					else{
						$location.path('/login');
					}
						
				}
			);
		}
		$scope.getUsers();

	})
.controller("UsersRegistrCtrl", function ($scope,$rootScope, $location, usersService){
		$scope.addNewUser = function(user){
			usersService.addNewUser(user).then(function(user) {
				alert("Registered Successfully, Kindly Login");
				$location.path('/login');
			});
		}
		$scope.passwordmatch = function(){
			var check = $scope.user.password == $scope.user.password2;
			if(check){
				console.log("Password matches");
				document.getElementById("register").disabled = false;
			}else{
				console.log("password not matches");
				document.getElementById("register").disabled = true;
			}
		}
	})
  
	.controller("UserEditCtrl", ['$scope','$location', '$routeParams','usersService', 'genders', function($scope, $location, $routeParams, usersService, genders
){
		//Executes when the controller is created
		var userId = $routeParams.userId;
		// $scope.genders = [{value:'Male', text:'Male'}, {value:'Female', text:'Female'}];
		$scope.genders = genders.gender;
		console.log("In edit controller");
		var user = {id: userId};
		usersService.fetchUser(user).then(function(user) {
			var original = user;
			$scope.user = original;
		});
		$scope.updateUser = function(user){
			user.put().then(function() {
				console.log("success put");
				$location.path('/users');
			});
		}
	}])
	  
	.controller("UserViewCtrl", ['$scope','$location', '$routeParams','usersService','newUsers', function($scope, $location, $routeParams, usersService, newUsers
){
		//Executes when the controller is created
		var userId = $routeParams.userId;
		var user = {id: userId};
		usersService.fetchUser(user).then(function(user) {
			var original = user;
			$scope.user = original;
		});
	}])
	  
  .controller("UserDeleteCtrl", ['$scope','$location', '$routeParams','usersService', function($scope, $location, $routeParams, usersService
){
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
      })
  
	  
.controller('LoginCtrl', function($scope, $rootScope,$location, usersService){
	$scope.logIn = function(user){
		usersService.chkLogin(user).then(function(user) {
			if (($scope.user.email) == (user[0].email)){
				alert("Welcome");
				$rootScope.is_logged = true;
				$location.path('/users');
			}else{
				alert("Email or Password is incorrect.");
				$location.path('/login');
			}
		});
	}
})

.controller('LogoutCtrl', function($scope, $rootScope,$location){
	alert("hello");
	$rootScope.is_logged = false;
});

