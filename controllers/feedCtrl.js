angular.module('app')
    .controller('feedCtrl' , function($scope, $http, authService ) {
        console.log("feedCtrl");   
        $http.get('http://localhost:58459/api/Blogs/GetBlogsList').then(function(response){
        	console.log(response)
        	$scope.blogs = response.data
        })

 
    $scope.authentication = authService.authentication;

    $scope.readMore = function(blog){
    $scope.blogs.forEach(function(blog){
        if(blog.isReadMore){
            if(blog.isReadMore == true){
                blog.isReadMore = false;
            }
        }
    });
    blog.isReadMore = true;
	}

    })


