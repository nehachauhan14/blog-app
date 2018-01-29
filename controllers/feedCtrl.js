angular.module('app')
    .controller('feedCtrl' , function($scope, $http, authService, feedService, $rootScope ) {
        $scope.noBlog = false
        $http.get('http://localhost:58459/api/Blogs/GetBlogsList').then(function(response){
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

$rootScope.$on('dataSet',function(){
            $scope.showfilteredBlogs()
        });       

        $scope.showfilteredBlogs = function() {
            $scope.blogs = feedService.getFiltererdBlogs()
            if($scope.blogs.length ==0){
                $scope.noBlog = true
            }

        };
    });


