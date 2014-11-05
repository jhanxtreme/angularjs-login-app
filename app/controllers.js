'use strict';

(function(){

	angular
	
		.module('LoginApp')
		
		.controller('HomeController', ['Gallery', 'AuthUser','$scope', '$location', '$rootScope', function(Gallery, AuthUser, $scope, $location, $rootScope){

			// check is user is login else redirect to login page.
			if(!$rootScope.isUserLogin){
				$location.path('/login');
				return;
			}

			$scope.title = "Gallery";

			Gallery.getAnimals().then(function(response){
				$scope.animals = response;
			});

		}])
		
		.controller('NavController', ['AuthUser','$scope', '$location', '$rootScope', '$timeout', function(AuthUser, $scope, $location, $rootScope, $timeout){
			$scope.logout = function(){

				if( AuthUser.isLogin() ){
					$timeout(function(){

						AuthUser.logout();
						$rootScope.isUserLogin = false;
						$location.path('/login');
						return;

					}, 2000);

					$('#logout').html('<a><img src="./app/img/ajax-loader.gif" />&nbsp; processing...</a>')
					//console.log('Processing... Please wait...');
				}
			
			}
		}])
		
		.controller('LoginController', ['AuthUser', '$scope', '$location', '$rootScope',  function(AuthUser, $scope, $location, $rootScope){

			// prevent user from viewing the login page when they are already logged in
			if( AuthUser.isLogin() ){
				$location.path('/home');
				return;
			}

			$scope.titleSignIn = "Create New Account";
			$scope.titleLogIn = "Member's Login";
			$scope.alertMessage = '';
			$scope.isValidUser = false;

			$scope.login = function(user){
				AuthUser.login(user)
					.then(function(response){
						if(response.token){
							var userToken = sessionStorage.getItem('user_token');
							var userEmail = sessionStorage.getItem('jx_session_user');
							if(userToken == null && userEmail == null){
								sessionStorage.setItem('user_token', response.token); //token
								sessionStorage.setItem('jx_session_user', response.content); // email
								$rootScope.jxUser = response.content;
							}

							//get the message from the api server
							$scope.alertMessage = response.message;

							//set scope boolean value for user status
							$scope.isValidUser = AuthUser.isLogin();

							//set global/root value for user status
							$rootScope.isUserLogin = AuthUser.isLogin();
							
							$location.path('/home');
							return;
						}
						else{
							$scope.alertMessage = response.message + ' Please try again.';
						}
					}, function(response){
						if(response == 404){
							//alert('Something went wrong. The requested page returns ' + response + ' status.');

							//this is use to log temporary user because there was an error in the api
							$scope.alertMessage = 'Unauthorized user. Please try again.';
							dummyUser(user);
						}
					});
			}

			$scope.createUser = function(newUser){
				/*AuthUser.registerSessionUser(newUser, function(response){
					console.log(response);
					$scope.newUser = {};
				});*/
				
			}


			var dummyUser = function(user){
				if(user.email == "test@test.com" && user.password == "1234"){
					sessionStorage.setItem('user_token', 'abcdefghijklmnopqrstuvwxyz'); //token
					sessionStorage.setItem('jx_session_user', 'jhanxtreme@gmail.com (temporary user)'); // email
					$rootScope.jxUser = 'jhanxtreme@gmail.com';
					$scope.alertMessage = 'a member';
					$scope.isValidUser = AuthUser.isLogin();
					$rootScope.isUserLogin = AuthUser.isLogin();
					$location.path('/home');
					return;
				}
			}
	
		}]);





})();