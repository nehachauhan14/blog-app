'use strict';
app.factory('myblogsService', ['$http', function ($http) {
 
    var serviceBase = 'http://localhost:58459/';
    var myblogsServiceFactory = {};
 
    var _getBlogs = function () {
 
        return $http.get(serviceBase + 'api/Blogs/GetBlogsById/1').then(function (results) {
            return results;
        });
    };


    var _getBlogByBid = function (bid) {
 
        return $http.get(serviceBase + 'api/Blogs/GetBlogsByBid/' + bid).then(function (results) {
            return results;
        });
    };
 
 	
    var _addBlogs = function (newBlog) {

        $http.post(serviceBase + '/api/Blogs/CreateBlog', newBlog, { headers: { 'Content-Type': 'application/JSON' } }).success(function (response) {
            return response ; 
        }).error(function (err, status) {
            deferred.reject(err);
        });
};

var _deleteBlog = function(bid){
    $http.delete(serviceBase + 'api/Blogs/DeleteBlogById/' + bid )
    .success(function (response) {
            return response ; 
    }).error(function (err, status) {
            deferred.reject(err);
        });
};

var _editBlog = function( bid , blogToEdit)
{
    $http.put(serviceBase + '/api/Blogs/UpdateBlogById/' + bid, newBlog, { headers: { 'Content-Type': 'application/JSON' } }).success(function (response) {
            return response ; 
        }).error(function (err, status) {
            deferred.reject(err);
        });
};

 myblogsServiceFactory.deleteBlog = _deleteBlog;
 myblogsServiceFactory.getBlogs = _getBlogs;
 myblogsServiceFactory.addBlogs = _addBlogs;
 myblogsServiceFactory.editBlog = _editBlog;
 myblogsServiceFactory.getBlogByBid = _getBlogByBid;

 return myblogsServiceFactory;

}]);
