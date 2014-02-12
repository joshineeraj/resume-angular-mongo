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
						alert("Kindly Login");
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
			var check = $scope.password1 == $scope.password2;
			if(check){
				console.log("i am true");
				document.getElementByID("register").disabled = true;
			}else{
				console.log("password not matches");
				document.getElementByID("register").disabled = false;
			}
		}
	})
  
	.controller("UserEditCtrl", ['$scope','$location', '$routeParams','usersService', function($scope, $location, $routeParams, usersService
){
		//Executes when the controller is created
		var userId = $routeParams.userId;
		$scope.genders = [{value:'Male', text:'Male'}, {value:'Female', text:'Female'}];
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
	  
	.controller("UserViewCtrl", ['$scope','$location', '$routeParams','usersService', function($scope, $location, $routeParams, usersService
){
		//Executes when the controller is created
		var userId = $routeParams.userId;
		$scope.genders = [{value:'Male', text:'Male'}, {value:'Female', text:'Female'}];
		console.log("In view controller");
		var user = {id: userId};
		//using editUser because it fetches the data from Server

		usersService.fetchUser(user).then(function(user) {
			var original = user;
			$scope.user = original;
		});
		//$scope.getUsers();
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
      })
	  
	  
.controller('LoginCtrl', function($scope, $rootScope,$location, usersService){
	$scope.logIn = function(user){
		usersService.chkLogin(user).then(function(user) {
			if ($scope.user.user_email = user[0].email){
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
	$scope.logOut = function(){
		$rootScope.is_logged = false;
	}
});

