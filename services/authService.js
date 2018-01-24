'use strict';

angular.module('app').factory('authService', ['$http', '$q', 'localStorageService', '$rootScope', function ($http, $q, localStorageService, $rootScope) {

    var serviceBase = 'http://localhost:58459/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName : "" ,  
        id : "" , 
        email : ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/Blogger/RegisterUser', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            $rootScope.currentUser = loginData.userName
            localStorage.setItem('currentUser',$rootScope.currentUser)

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

var _loginUsingFacebook = function(newUser)
{
        debugger
        var deferred = $q.defer();
        $http.post('http://localhost:58459/api/Account/Register', newUser, { headers: { 'Content-Type': 'application/JSON' } }).success(function (response) {

             localStorageService.set('authorizationData', { token: response.access_token, userName: newUser.userName });
             _authentication.isAuth = true;
             _authentication.userName = newUser.userName;
             $rootScope.currentUser = newUser.userName
             localStorage.setItem('currentUser',$rootScope.currentUser)

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
};


    var _logOut = function () {

        localStorageService.remove('authorizationData');
        localStorage.removeItem('currentUser')
        $rootScope.currentUser = null
        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
authServiceFactory.loginUsingFacebook = _loginUsingFacebook;

    return authServiceFactory;
}]);