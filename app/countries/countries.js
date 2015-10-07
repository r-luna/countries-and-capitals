
app.controller('CountriesController', function($scope, $location, $http){
    var that = this;
    this.data = null;

    this.back = function(){
        $location.path('/');  
    };
    
    
    this.getData = function(){
        $http({
            url: 'http://api.geonames.org/countryInfoJSON?username=eyepoker',
            method: 'GET',
            data:  {callback: 'JSON_CALLBACK'},
        })
        .then(function(data, status, headers, config) {
            console.log('Success!');
            console.log(data);
            that.data = data.data.geonames;

            // called when the data is available
        },
        function(data, status, headers, config) {
            console.log('Failure :(');
            // called when an error occurs or
            // the server returns data with an error status
        });
    };
    
});