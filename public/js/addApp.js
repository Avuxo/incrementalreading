var app = angular.module("addApp", []);

app.controller("listCtrl", function($scope, $http){
    //test data

    $scope.remove = function(name){
        alert(name);
    }
    
    $http({method: 'GET', url: '/article'})
        .then(function(res){
            $scope.items = $scope.data.title;
        })
});
