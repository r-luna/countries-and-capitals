
app.controller('CountriesController', function($scope, $location, $http, geonames){
    var that = this;
    this.data = null;
    
    this.back = function(){
        $location.path('/');  
    };
    
    this.showCapitalDetail = function(country,capital){
        var niceCountry = country.replace(' ','_');
        var niceCapital = capital.replace(' ','_');
      $location.path('/country/' + niceCountry + '/' + niceCapital);
    };
    
    function getData(){
        $http({
            url: 'http://api.geonames.org/countryInfoJSON?username=eyepoker&_=' + Math.random(),
            method: 'GET',
            data:  {callback: 'JSON_CALLBACK'},
        })
        .then(function(response) {
            if (response.status === 200){
                geonames.insert(response.data.geonames);
                that.data = geonames.data;
                console.log(that.data);
            } else {
                console.log(response.status, response.statusText);   
            }
        },
        function(data, status, headers, config) {
            console.log('Failure :(');
            // called when an error occurs or
            // the server returns data with an error status
        });
    }
    
    $scope.$on('$viewContentLoaded', function(event,viewConfig){
        if (!geonames.data){
            getData();
        } else {
            that.data = geonames.data;   
        }
    });
    
});