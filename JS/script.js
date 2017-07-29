var myApp = angular.module("myApp",[]);

mpApp.controller("myController", ["$scope", function($scope){
 
  $scope.gmail = {
    
    username:  "",
    email:  ""
  };
  
  $scope.loginWithGoogle = function(){
        gapi.client.load('plus', 'v1',function(){});
        var params = {
            'clientid':'your_id',
            'cookiepolicy':'single_host_origin',
            'callback': function(result){
                if(result['status']['signed_in']){
                    var request =gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function(resp){
                        $scope.$apply(function(){
                            console.log('email', resp.emails[0].value);
                        });
                    });
                }
            },
            'approvalprompt':'force',
            'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(params);
   } ;

}]);