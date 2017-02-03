var app = angular.module("indexApp", []);

app.controller("navCtrl", function($scope, $http){

    //get the article
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            $scope.title = res.data.title;
            $scope.source = res.data.domain;
        },function(res){ //GET failure
            console.log('Failure to obtain article.');
        });
});

app.controller("articleCtrl", function($scope, $http){
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            if(typeof res.data.content != 'undefined'){
                $scope.articleBody = res.data.content; //this is just LOOKING for XSS
                document.getElementById('article').innerHTML = $scope.articleBody;
            }else{
                console.log("Failed to obtain article, returned 'undefined'");
            }
        },function(res){ //GET failure
            console.log('Failure to obtain article');
        });
    
});
