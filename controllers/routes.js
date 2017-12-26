	angular.module('app')
	    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	        $urlRouterProvider.otherwise('/');
	        $stateProvider
	            .state('app', {
	                url: '/',
	                views: {
	                    'header': {
	                        templateUrl: '../views/nav.html'
	                    },
	                    'content': {
	                        templateUrl: '../views/feed.html'	                        
	                    }
	                }
	            })
	            .state('app.register', {
	                url: 'register',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/register.html',
	                    }
	                }

	            })
	            .state('app.login', {
	                url: 'login',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/login.html',
	                    }
	                }

	            })
	            .state('app.myblogs', {
	                url: 'myblogs',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/myblogs.html',
	                    }
	                }

	            })


	        $locationProvider.html5Mode(true)

	    });