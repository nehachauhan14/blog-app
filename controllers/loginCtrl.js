'use strict';
app.controller('loginCtrl', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
    $scope.loginData = {
        userName: "",
        password: ""
    };
    $scope.message = "";
    
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            $location.path('/myblogs');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };


 $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';
        var externalProviderUrl = "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + 'BlogApp'
                                                                    + "&redirect_uri=" + "http%3A%2F%2Flocalhost%3A5001%2Fsignin-facebook";
        window.$windowScope = $scope;//&state=JKo2RSqusrQYSXVvIMNm_n1It4jesvKrXN2zO62cH2g1

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

$scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }

    // $scope.authenticateExternalProvider = function (provider) {

    //     var externalProviderUrl = "/api/Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Flogin&state=JKo2RSqusrQYSXVvIMNm_n1It4jesvKrXN2zO62cH2g1";
    //     window.location.href = externalProviderUrl;

    // };

    //     $scope.CheckLocationHash = function () {
    //     if (location.hash) {

    //         if (location.hash.split('access_token=')) {
    //             $scope.accessToken = location.hash.split('access_token=')[1].split('&')[0];
    //             if ($scope.accessToken) { 
    //                 loginAppFactory.CheckRegistration($scope.accessToken).then(function (response) {
    //                     if (response.data.HasRegistered) {
    //                         localStorageService.set('authorizationData', { token: $scope.accessToken, userName: response.userName });
    //                         location.href = "/html/successpage.html";
    //                     }
    //                     else {
    //                         loginAppFactory.SignupExternal($scope.accessToken).then(function (response) {
    //                             localStorageService.set('authorizationData', { token: $scope.accessToken, userName: response.userName });
    //                             location.href = "/html/successpage.html";
    //                         }, function (err) {
    //                             alert(err.data.Message);
    //                         })
    //                     }
    //                 }, function () {
    //                     alert("failed.");
    //                 })
    //             }
    //         }
    //     }
    //     }

    //     $scope.CheckLocationHash();



}]);