
'use strict';
app.controller('myblogsCtrl', ['$scope', 'myblogsService' , function ($scope, myblogsService) {

    $scope.blogs = [];
    $scope.newBlog = {
    	bid : '', 
    	title : "" , 
    	blog_Content : "", 
    	uid : 1
    };

    myblogsService.getBlogs().then(function (results) {
    	        $scope.blogs = results.data;

    }, function (error) {
       alert(error.data.message);
    });


$scope.addBlog = function (newBlog) {
        myblogsService.addBlogs($scope.newBlog).then(function (response) {
        	debugger
            $scope.addedSuccessfully = true;
            $scope.message = "Blog has been saved Successfully";

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to add new blog due to :" + errors.join('');
         });

};


}]);