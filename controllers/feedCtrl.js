angular.module('app')
    .controller('feedCtrl', function($scope, $http) {
        console.log("feedCtrl");   
        $http.get('http://localhost:58459/api/Blogs/GetBlogsList').then(function(response){
        	console.log(response)
        	$scope.blogs = response.data
        })
    })
