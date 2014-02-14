'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngUpload', 'chieffancypants.loadingBar', 'ngAnimate'])
	.controller("UsersCtrl", function ($scope,$rootScope, $location, usersService, cfpLoadingBar){
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
		cfpLoadingBar.complete();
	})
.controller("UsersRegistrCtrl", function ($scope,$rootScope, $location, $timeout, usersService, cfpLoadingBar){
		$scope.addNewUser = function(user){
			usersService.addNewUser(user).then(function(user) {
				cfpLoadingBar.start();
				$location.path('/login');
				cfpLoadingBar.complete();
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

    	// fake the initial load so first time users can see it right away:
	    $scope.start();
	    $timeout(function() {
		    $scope.complete();
		    }, 1000);
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
  
	  
.controller('LoginCtrl', function($scope, $rootScope, $location, usersService, cfpLoadingBar, $timeout, Facebook){
    // Define user empty data :/
    $scope.user = {};
    
    // Defining user logged status
    $scope.logged = false;
    
    // And some fancy flags to display messages upon user status change
    $scope.byebye = false;
    $scope.salutation = false;

	
	// Here, usually you should watch for when Facebook is ready and loaded
	  $scope.$watch(function() {
	    return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
	  }, function(newVal) {
	    $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
	  });

	$scope.logIn = function(user){
		usersService.chkLogin(user).then(function(user) {
			if ( (($scope.user.email) == (user[0].email)) && (($scope.user.password) == (user[0].password)) ){
				alert("Welcome");
				$rootScope.is_logged = true;
				cfpLoadingBar.start();
				$location.path('/users');
			}else{
				alert("Email or Password is incorrect.");
				$location.path('/login');
			}
		});
	}
	
    /**
     * IntentLogin
     */
    $scope.IntentLogin = function() {
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $rootScope.is_logged = true;
          $scope.me();
        }
        else
          $scope.fblogin();
      });
    };
    
    /**
     * Login
     */
     $scope.fblogin = function() {
       Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $rootScope.is_logged = true;
          $scope.me();
        }
      
      });
     };
     
     /**
      * me 
      */
      $scope.me = function() {
        Facebook.api('/me', function(response) {
          /**
           * Using $scope.$apply since this happens outside angular framework.
           */
          $scope.$apply(function() {
            $rootScope.logged_in_user = response;
            $scope.me_picture();
          });
          
        })
      };
      $scope.me_picture = function() {
          Facebook.api('/me/picture/?type=normal', function(pic_response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
            	$rootScope.logged_in_user.pic = pic_response;
            });
            
          });
          $location.path('/users');
        }; 
    
    /**
     * Logout
     */
    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;  
        });
      });
    }
    
    /**
     * Taking approach of Events :D
     */
    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye     = false;    
        });
      } else {
        $scope.$apply(function() {
          $scope.salutation = false;
          $scope.byebye     = true;
          
          // Dismiss byebye message after two seconds
          $timeout(function() {
            $scope.byebye = false;
          }, 2000)
        });
      }
      
      
    });
})

.controller('LogoutCtrl', function($scope, $rootScope,$location){
	alert("hello");
	$rootScope.is_logged = false;
});

