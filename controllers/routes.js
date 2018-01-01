	app.config(function($stateProvider, $urlRouterProvider, $locationProvider ) {
	          $locationProvider.html5Mode(true);
	        $urlRouterProvider.otherwise('/');
	        $stateProvider
	            .state('app', {
	                url: '/',
	                views: {
	                    'header': {
	                        templateUrl: '../views/nav.html'
	                    },
	                    'content': {
	                        templateUrl: '../views/feed.html',
	                        controller: 'feedCtrl'	                        
	                    }
	                }
	            })
	            .state('app.signup', {
	                url: 'signup',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/signup.html',
	                        controller : 'signupCtrl'
	                    }
	                }

	            })
	            .state('app.login', {
	                url: 'login',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/login.html',
	                        controller : 'loginCtrl'
	                    }
	                }

	            })
	            .state('app.myblogs', {
	                url: 'myblogs',
	                views: {
	                    'content@': {
	                        templateUrl: '../views/myblogs.html',
	                        controller : 'myblogsCtrl'
	                    }
	                }

	            })


	        $locationProvider.html5Mode(true)

	    });



	app.run(['authService', function (authService,$localStorageService) {
    authService.fillAuthData();

}]);

	
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});