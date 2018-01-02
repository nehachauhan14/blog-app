
'use strict';
app.controller('myblogsCtrl', ['$scope', 'myblogsService' , function ($scope, myblogsService) {

    $scope.blogs = [];
    $scope.newBlog = {
    	bid : '', 
    	title : "" , 
    	blog_Content : "", 
    	uid : 1
    };
  
    $scope.addedSuccessfully = false ; 
    $scope.deletedSuccessfully = false;
    $scope.message = "";

$scope.setup = function(){
     myblogsService.getBlogs().then(function (results) {
                $scope.blogs = results.data;

    }, function (error) {
       alert(error.data.message);
    });
}

$scope.setup();

$scope.getBlogToEdit = function(Id){
   myblogsService.getBlogByBid(Id).then(function(results){
        $scope.newBlog = results.data[0];
   })
    
}; 

$scope.editBlog = function(newBlog){
    myblogsService.editBlog( $scope.newBlog.bid , newBlog).then(function(results){
        debugger
        console.log(results);
        $scope.setup();
    })
};



$scope.addBlog = function (newBlog) {
        myblogsService.addBlogs($scope.newBlog).then(function (response) {
            $scope.addedSuccessfully = true;
            $scope.message = "Blog has been saved Successfully";
            $scope.setup();
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


$scope.deleteBlog = function(bid){
if(confirm('Are you sure you want to delete this?')){
myblogsService.deleteBlog(bid).then(function(response){
		$scope.deletedSuccessfully = true; 
		$scope.message = "deleted Successfully" ; 
        $scope.setup();
},
function(response){
	var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to Delete blog due to :" + errors.join('');
});
}
}
}]);