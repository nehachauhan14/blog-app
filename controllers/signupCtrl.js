angular.module('app').controller('signupCtrl', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        pwd: "",
        confirmPassword: "" , 
        email : ""
    };


    $scope.signUp = function () {
        
        if($scope.registration.pwd.length >0 && $scope.registration.confirmPassword.length >0 && $scope.registration.userName.length >0 && $scope.registration.email.length >0){
            if($scope.registration.confirmPassword == $scope.registration.pwd)
            {
                authService.saveRegistration($scope.registration).then(function (response) {
                        $scope.savedSuccessfully = true;
                        $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                        startTimer();

                    },
                    function (response) {
                    if (response.data)
                    {
                        $scope.message = "Failed to register user due to:" + response.data;
                    }
                    else
                    {
                        var errors = [];
                            for (var key in response.data.modelState) {
                                for (var i = 0; i < response.data.modelState[key].length; i++) {
                                    errors.push(response.data.modelState[key][i]);
                                }
                            }
                        $scope.message = "Failed to add new blog due to :" + errors.join('');
                    }
            
             });
              
            }
            else
            {
               $scope.message = "Password and Reset password are not same. Please Re-enter"; 
            }    
                
        }

    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);