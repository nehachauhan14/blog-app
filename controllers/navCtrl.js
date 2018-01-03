'use strict';
app.controller('navCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
 
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }
 
    $scope.authentication = authService.authentication;
 
$scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
};

}]);