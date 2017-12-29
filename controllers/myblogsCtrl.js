angular.module('app').
controller('myblogsCtrl' , function($scope , $http){
	console.log("myblogCtrl");   
        $http.get('http://localhost:58459/api/Blogs/GetBlogsById/1').then(function(response){
        	console.log(response)
        
        	$scope.blogs = response.data
	})
})