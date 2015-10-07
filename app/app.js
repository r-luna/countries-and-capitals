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
            templateUrl : '/'
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