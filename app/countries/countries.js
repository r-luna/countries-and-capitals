
app.controller('CountriesController', function($scope, $rootScope, $location, $http, geonames){
    var that = this;
    this.data = null;
    
    this.canShowModal = false;
    this.modalMessage = '';
    
    this.home = function(){
        $location.path('/');  
    };
    
    function showModal(str){
        that.modalMessage = str;
        that.canShowModal = true;
    }
    
    this.hideModal = function(){
        that.canShowModal = false;
        that.modalMessage = '';
    };
    
    this.showCapitalDetail = function(country,capital){
        if (!country || !capital){
            showModal('Unable to find country information without a capital.');
            return;
        }
        var niceCountry = country.replace(' ','_');
        var niceCapital = capital.replace(' ','_');
        $location.path('/country/' + niceCountry + '/' + niceCapital);
    };
    
    function getData(){
        $rootScope.isLoadingData = true;
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
                showModal(response.status, response.statusText);   
            }
            $rootScope.isLoadingData = false;
        },
        function(data, status, headers, config) {
            showModal(status);
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