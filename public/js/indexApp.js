var app = angular.module("indexApp", []);

app.controller("navCtrl", function($scope, $http){

    //get the article
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            $scope.title = res.data.title;
            $scope.source = res.data.source;
        },function(res){ //GET failure
            console.log('Failure to obtain article.');
        });
});

app.controller("articleCtrl")
