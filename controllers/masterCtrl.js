angular.module('app')
    .controller('masterCtrl', function($scope, $http, $rootScope) {

        console.log("masterCtrl");        

        if (localStorage.getItem('currentUser')) {         
            $rootScope.currentUser = localStorage.getItem('currentUser')
            $rootScope.isAuthenticated = true;
        }
    })
