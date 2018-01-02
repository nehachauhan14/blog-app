'use strict';
app.factory('myblogsService', ['$http', function ($http) {
 
    var serviceBase = 'http://localhost:58459/';
    var myblogsServiceFactory = {};
 
    var _getBlogs = function () {
 
        return $http.get(serviceBase + 'api/Blogs/GetBlogsById').then(function (results) {
            return results;
        });
    };


    var _getBlogByBid = function (bid) {
 
        return $http.get(serviceBase + 'api/Blogs/GetBlogsByBid/' + bid).then(function (results) {
            return results;
        });
    };
 
 	
    var _addBlogs = function (newBlog) {

        return $http.post(serviceBase + '/api/Blogs/CreateBlog', newBlog, { headers: { 'Content-Type': 'application/JSON' } })
};

var _deleteBlog = function(bid){
    return $http.delete(serviceBase + 'api/Blogs/DeleteBlogById/' + bid )
   
};

var _editBlog = function( bid , newBlog)
{
   return  $http.put(serviceBase + '/api/Blogs/UpdateBlogById/' + bid, newBlog, { headers: { 'Content-Type': 'application/JSON' } })
};

 myblogsServiceFactory.deleteBlog = _deleteBlog;
 myblogsServiceFactory.getBlogs = _getBlogs;
 myblogsServiceFactory.addBlogs = _addBlogs;
 myblogsServiceFactory.editBlog = _editBlog;
 myblogsServiceFactory.getBlogByBid = _getBlogByBid;

 return myblogsServiceFactory;

}]);
