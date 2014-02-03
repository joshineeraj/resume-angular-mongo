'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory("usersService", function($http, Restangular){
    var _getUsers = function(){
    	var userData = Restangular.all('users').getList();
    	return userData;
    }
    
    var _addNewUser = function(newUser){
    	var user = Restangular.all('users').post(newUser);
    	return user;
    	
    }
    var _editUser = function(user){
    	var originalUser =  Restangular.one('users', user.id).get();
    	var editUser = Restangular.copy(originalUser);
    	return editUser;
    }
    var _removeUser = function(user){
    	var originalUser =  Restangular.one('users', user.id).get();
    	return originalUser;
    }

    return{
        getUsers: _getUsers,
        addNewUser: _addNewUser,
        editUser: _editUser,
        removeUser:_removeUser
    };
});

