var app = angular.module('app', ['ngRoute','ngMessages','ngAnimate','ngTouch']).constant('CONSTANTS',{version: '0.0.0'});
    
app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home/home.html',
            controller : 'HomeController as home'
        }).when('/countries/', {
            templateUrl : 'countries/countries.html',
            controller : 'CountriesController as countries'
        }).when('/country/:country/:capital', {
            templateUrl : 'country/country.html',
            controller : 'CountryController as country'
        }).when('/error/', {
            templateUrl : '/error/error.html'
        })
        .otherwise('/');
    }]);


app.factory('geonames', function(){
    return{
        data: null,
        insert: function(d){
            this.data = d;   
        }
    };
});

app.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 400);
    });
});