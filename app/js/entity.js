'use strict';


angular.module('myApp.entity', []).
factory('genders', function(){
	var _gender = [{value:'Male', text:'Male'}, 
				  {value:'Female', text:'Female'}];	
	return{gender: _gender};
})

function newUsers(){
	var name = {};
	var email = {};
	var qualification = {};
	var mobile = {};
	var skills = {};
	var location = {};
	var year_passing = {};
	var gender = [{value:'Male', text:'Male'}, {value:'Female', text:'Female'}];
	var current_employer = {};

}
