
app.controller('HomeController',['$scope', '$location', function($scope, $location){

    this.start = function(){
        $location.path('/countries');  
    };
}]);