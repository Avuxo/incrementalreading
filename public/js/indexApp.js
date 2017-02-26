var app = angular.module("indexApp", []);

app.controller("navCtrl", function($scope, $http){
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            $scope.title = res.data.title;
            $scope.source = res.data.domain;
        },function(res){ //GET failure
            console.log('Failure to obtain article.');
        });
    //give the server the info it needs to go to the next article
    $scope.next = function(){
        $http.post('/next', {"pos":document.body.scrollTop});
        window.location.reload();
    }
});

app.controller("articleCtrl", function($scope, $http, $anchorScroll, $location, $timeout){
    $http({method: 'GET', url: '/article'})
        .then(function(res){ //GET success
            if(typeof res.data.article != 'undefined'){
                $scope.articleBody = res.data.article; //:thinking:
                document.getElementById('article').innerHTML = $scope.articleBody;
                document.body.scrollTop = res.data.position;
            }else{
                console.log("Failed to obtain article, returned 'undefined'");
            }
        },function(res){ //GET failure
            console.log('Failure to obtain article');
        });
});
