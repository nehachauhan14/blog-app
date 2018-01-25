'use strict';
app.controller('loginCtrl', ['$scope', '$location', 'authService' , 'localStorageService', '$rootScope' ,  function ($scope, $location, authService , localStorageService , $rootScope) {
    $scope.loginData = {
        userName: "",
        password: ""
    };
    $scope.message = "";

    var _authentication = {
        isAuth: false,
        userName : "" , 
        id : "" , 
        email : ""
    };
    

    $scope.login = function () {
     if($scope.loginData.userName.length >0 && $scope.loginData.password.length >0){
        authService.login($scope.loginData).then(function (response) {
            $location.path('/myblogs');
        },
         function (err) {
             $scope.message = err.error_description;
         });

    }
        }


    // FB.logout(function(response) {
    //     console.log(response)
    // });

    $scope.registerWithFacebook = function() {
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log("Here",response)
                    // Logged into your app and Facebook.
                    $scope.graphAPI();
                }  else if (response.status === 'not_authorized') {
                    // The person is not logged into your app or we are unable to tell.
                    document.getElementById('status').innerHTML = 'Please log ' +
                        'into this app.';
                    $scope.openLoginDialog(response);
                } else{
                   
                    console.log("teSTING ERROR :" +response);
                     $scope.openLoginDialog(response);
                }

                console.log(response)
            });
        }

        $scope.openLoginDialog = function(response) {
            console.log(response)
            FB.login(function(res) {
                console.log(res)
                if (res.status === 'connected') {
                    console.log("Here")
                    // Logged into your app and Facebook.
                    $scope.graphAPI(res.access_token);
                }
            }, { scope: 'public_profile,email' })
        }


        $scope.graphAPI = function(token) {
            console.log('Welcome!  Fetching your information.... ');

            FB.api('/me?fields=id,name,gender,email', function(response) {
                
                _authentication.userName = response.name;
                _authentication.id = response.id;
                _authentication.email = response.email; 
                 authService.loginUsingFacebook(_authentication).then(function (response) {
            $location.path('/myblogs');
        },
         function (error) {
             $scope.message = error.message;
         });
            
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
        }


        $scope.getUserData = function(userId) {
            FB.api('/'+userId+'/picture', function(response) {
                console.log(response)                
            });
        }

}]);