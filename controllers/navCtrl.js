'use strict';
app.controller('navCtrl', ['$scope', '$http', '$location', 'authService', 'myblogsService', 'feedService', '$rootScope', function ($scope, $http, $location, authService,  myblogsService, feedService, $rootScope, localStorageService ) {
 
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }
 
    $scope.authentication = authService.authentication;
    
    $scope.searchString = "";

$scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
};

$scope.search = function(){
    if($location.path() == "/"){
        console.log($scope.searchString);
        $http.get("http://localhost:58459/api/Blogs/GetBlogsBySearch" + "?searchText=" + $scope.searchString)
        .then(function(response){
            feedService.setFiltererdBlogs(response.data);
            $rootScope.$emit('dataSet', response.data);
        })
    }
    else{
        $http.get("http://localhost:58459/api/Blogs/GetFilteredBlogsById" + "?searchText=" + $scope.searchString)

        .then(function(response){
            myblogsService.setFiltererdBlogs(response.data);
            $rootScope.$emit('myDataSet', response.data);
        })

    }
}
}]);