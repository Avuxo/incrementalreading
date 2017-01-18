var app = angular.module("indexApp", []);

app.controller("navCtrl", function($scope, $http){

    //get the article
    $http({method: 'GET', url: '/article'})
        .then(function(res){
            $scope.test = res.data; //GET success
        },function(res){
            console.log('Failure to obtain article.'); //GET failure
        });
});












