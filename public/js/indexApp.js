var app = angular.module("indexApp", []);

app.controller("navCtrl", function($scope, $http){

    //get the article
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            $scope.title = res.data.title;
        },function(res){ //GET failure
            console.log('Failure to obtain article.');
        });
});
