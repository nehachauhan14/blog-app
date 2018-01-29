'use strict';
app.factory('myblogsService', ['$http', function ($http) {
 
    var serviceBase = 'http://localhost:58459/';
    var myblogsServiceFactory = {};
    var _filteredBlogs = {};
 
 var _getFiltererdBlogs = function(){
        return _filteredBlogs
    };

    var _setFiltererdBlogs = function(filteredBlogs){
        _filteredBlogs = filteredBlogs;
    }; 

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
        console.log(newBlog)
        return $http.post(serviceBase + '/api/Blogs/CreateBlog', {title: newBlog.title, Blog_Content: newBlog.blog_Content}, { headers: { 'Content-Type': 'application/JSON' } })
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
 myblogsServiceFactory.setFiltererdBlogs = _setFiltererdBlogs;
 myblogsServiceFactory.getFiltererdBlogs = _getFiltererdBlogs;

 return myblogsServiceFactory;

}]);
