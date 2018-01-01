'use strict';
app.factory('myblogsService', ['$http', function ($http) {
 
    var serviceBase = 'http://localhost:58459/';
    var myblogsServiceFactory = {};
 
    var _getBlogs = function () {
 
        return $http.get(serviceBase + 'api/Blogs/GetBlogsById/1').then(function (results) {
            return results;
        });
    };
 
 
 	var _addBlogs = function (newBlog) {

        var data = "Title=" + newBlog.title + "&Blog_Content=" + newBlog.content + "&UID=" + newBlog.uid;

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/JSON' } }).success(function (response) {
        	return response ; 
        }).error(function (err, status) {
            deferred.reject(err);
        });
    };  


 myblogsServiceFactory.getBlogs = _getBlogs;
 myblogsServiceFactory.addBlogs = _addBlogs;
 
 return myblogsServiceFactory;

}]);
