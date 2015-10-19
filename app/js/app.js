var app = angular.module('app', ['ngRoute','ngMessages','ngAnimate','ngTouch']).constant('CONSTANTS',{version: '0.0.0'});
    
app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'templates/home.html',
            controller : 'HomeController as home'
        }).when('/countries/', {
            templateUrl : 'templates/countries.html',
            controller : 'CountriesController as countries'
        }).when('/country/:country/:capital', {
            templateUrl : 'templates/country.html',
            controller : 'CountryController as country'
        }).when('/error/', {
            templateUrl : '/templates/error.html'
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

app.run(['$rootScope', '$location', '$timeout',function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 700);
    });
}]);