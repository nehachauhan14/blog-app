var app = angular.module('app', [
    'ngRoute', 'ui.router' , 'LocalStorageModule'
])

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});