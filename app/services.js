'use strict';

(function(){

	angular
		.module('LoginApp')
		
		.factory('AuthUser', ['$http', '$q', 'API_URL', function($http, $q, API_URL){
			return {
				validate: function(){
					var sess1 = sessionStorage.getItem('user_token');
					var sess2 = sessionStorage.getItem('jx_session_user');
					if(sess1 !== null && sess2 !== null){
						// todo here
					}

				},

				login : function(user){
					var deferred = $q.defer();
					$http.get(API_URL.url[0], {params: user})
						.success(function(data, status, headers, config){
							deferred.resolve(data);
						})
						.error(function(data, status, headers, config){
							deferred.reject(status);
						});
					return deferred.promise;
				},

				registerSessionUser : function(user, callback){
					//todo here
					callback(tmp); 
				},

				logout: function(){
					if(this.isLogin()){
						sessionStorage.removeItem('user_token');
						sessionStorage.removeItem('jx_session_user');
					}
				},
				
				isLogin: function(){
					var status1 = sessionStorage.getItem('user_token');
					var status2 = sessionStorage.getItem('jx_session_user');
					return (status1 !== null && status2 !== null) ? true : false;
				},

				getUserEmail: function(){
					if(this.isLogin()){
						return sessionStorage.getItem('jx_session_user');
					}
				}
			}
		
		}])


		.factory('Gallery', ['$http', '$q', 'API_URL', function($http, $q, API_URL){

			return {

				getAnimals: function(){
					var deferred = $q.defer();

					$http.get(API_URL.url[1])
						.success(function(data, status, headers, config){
							deferred.resolve(data);
						})
						.error(function(data, status, headers, config){
							deferred.reject(data);
						});
					return deferred.promise;
				}

			}

		}])

		;


})();