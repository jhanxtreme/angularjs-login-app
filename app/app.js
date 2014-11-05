'use strict';

(function(){
	
	angular
		.module('LoginApp', ['ngRoute'])

		.constant('API_URL', {
			url: [
				'http://localhost/api/users/',
				'./app/data.json'
			]			
		})

		.config(['$routeProvider', function($routeProvider){
		
			$routeProvider
				.when('/home', {
					templateUrl: './app/js/views/home.html',
					controller: 'HomeController'
				})
				.when('/login', {
					templateUrl: './app/js/views/login.html',
					controller: 'LoginController'
				})
				.otherwise({
					redirectTo: '/'
				});
		
		}])
		
		
		.run(['AuthUser','$rootScope','$location', 'API_URL',  function(AuthUser, $rootScope, $location, API_URL){

			//sets root variable
			$rootScope.isUserLogin = $rootScope.isUserLogin || false;

			//set root user email 
			$rootScope.jxUser = $rootScope.jxUser || '';
			
			// listen root variable if it's change
			$rootScope.$watch('isUserLogin', function(){
				$rootScope.isUserLogin = AuthUser.isLogin(); // return boolean true if user logged in
				$rootScope.jxUser = AuthUser.getUserEmail(); // return email when the user is logged in
				console.log('Current user is logged in.');
			});

		}]);
	
	
})();
