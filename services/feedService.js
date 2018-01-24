'use strict';
app.factory('feedService', ['$http', function ($http) {
 
    var serviceBase = 'http://localhost:58459/';
    var feedServiceFactory = {};
    var _filteredBlogs = {};

    var _getFiltererdBlogs = function(){
        return _filteredBlogs;
    };

    var _setFiltererdBlogs = function(filteredBlogs){
        _filteredBlogs = filteredBlogs;
    }; 

 feedServiceFactory.setFiltererdBlogs = _setFiltererdBlogs;
 feedServiceFactory.getFiltererdBlogs = _getFiltererdBlogs;

 return feedServiceFactory;

}]);   