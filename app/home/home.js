
app.controller('HomeController', function($scope, $location){

    this.start = function(){
        $location.path('/countries');  
    };
});