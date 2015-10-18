
app.controller('CountryController', function($scope,$routeParams,$location,$http,geonames){
    
    // PRIVATE
    
    var that = this;
  	
    /**
  	 * Gets the geonames data for the given capital city.
  	 * @type {Function}
     * @name country.getData
     * @param {String} capital - the name of the city
  	 * @return {String} flag URI
  	 */
    function getData(capital){
        $http({
            url: 'http://api.geonames.org/searchJSON?q=' + capital + '&maxrows=10&username=eyepoker&_=' + Math.random(),
            method: 'GET',
            data:  {callback: 'JSON_CALLBACK'},
        })
        .then(function(response) {
            if (response.status === 200){
                that.data = response.data.geonames[0];
            } else {
                console.log(response.status, response.statusText);   
            }
        },
        function(data, status, headers, config) {
            console.log('Failure :(');
        });
    }
    
    // PUBLIC
    
    this.data = null;
    this.neighbours = [];
    this.error = null;
    
    /**
  	 * This fires when the view is loaded  - and in turn fires getData() and getNeighbors()
  	 * @type {Function}
  	 */
    $scope.$on('$viewContentLoaded', function(event,viewConfig){
        if (!geonames.data){
            $location.path('/');
            return;
        }
        getData(escape($routeParams.capital.replace('_',' ')));
        getNeighbors(escape($routeParams.country.replace('_',' ')));
    });
    
    /**
  	 * This loads up the "hoome" view
  	 * @type {Function}
     * @name country.home
  	 * @return {} Returns nothing
  	 */
    this.home = function(){
      $location.path('/');
    };
    
    /**
  	 * Loads the "coountries" view
  	 * @type {Function}
     * @name country.back
  	 * @return {} Returns nothing
  	 */
    this.back = function(){
      $location.path('/countries');
    };
    
    /**
  	 * This loads up a new country / capital to view.
  	 * @type {Function}
     * @name country.showCountry
     * @param {String} country - the name of the country
  	 * @return {} Returns nothing
  	 */
    this.showCountry = function(country){
        that.neighbours = [];
        that.error = null;
        var d = geonames.data || [];
        var country = country.replace('_',' ');
        var capital = null;
        // find the country in the data so we can get the capital
        for (var i=0;i<d.length;i++){
            if (d[i].countryName === country){
                capital = d[i].capital.replace(' ','_');
            }
        }
        $location.path('/country/' + country + '/' + capital);
    };
    
  	/**
  	 * Returns the country population
  	 * @type {Function}
     * @name country.returnCountryPopulation
  	 * @return {Number} Returns the population as a number
  	 */
    this.returnCountryPopulation = function(){
        var d = geonames.data || [];
        var country = $routeParams.country.replace('_',' ');
        for (var i=0;i<d.length;i++){
            if (d[i].countryName === country){
                return d[i].population;
            }
        }
    };
    
  	/**
  	 * Returns the URI fro the country's flag.
  	 * @type {Function}
     * @name country.returnFlagURI
  	 * @return {String} flag URI
  	 */
    this.returnFlagURI = function(){
        var d = geonames.data || [];
        var country = $routeParams.country.replace('_',' ');
        var code = null;
        // find the country
        for (var i=0;i<d.length;i++){
            if (d[i].countryName === country){
                code = d[i].countryCode.toLowerCase();
            }
        }
        return 'http://www.geonames.org/flags/x/' + code + '.gif';  
    };
    
  	/**
  	 * Returns the URI for the country's map.
  	 * @type {Function}
     * @name country.returnCountryURI
  	 * @return {String} flag URI
  	 */
    this.returnCountryURI = function(){
        var d = geonames.data || [];
        var country = $routeParams.country.replace('_',' ');
        var code = null;
        // find the country
        for (var i=0;i<d.length;i++){
            if (d[i].countryName === country){
                code = d[i].countryCode;
            }
        }
        return 'http://www.geonames.org/img/country/250/' + code + '.png';  
    };
    
  	/**
  	 * Uses the two-letter country code to find the neighbouring countries for the current country.
     * @private
  	 * @type {Function}
     * @name country.getNeighbors
     * @param {String} country - the name of the country
  	 * @return {} Returns nothing
  	 */
    function getNeighbors(country){
        // find the geoNameId for the capital city's country
        var d = geonames.data || [];
        var code = null;
        for (var i=0;i<d.length;i++){
            if (d[i].countryName === country){
                console.log(d[i]);
                code = d[i].countryCode;
                break;
            }
        }
        if (!code){
            that.error = 'Couldn\'t determine the geonameId from the city name';
            return;
        }
        $http({
            url: 'http://api.geonames.org/neighboursJSON?country=' + code + '&username=eyepoker&_=' + Math.random(),
            method: 'GET',
            data:  {callback: 'JSON_CALLBACK'},
        })
        .then(function(response) {
            if (response.status === 200){
                that.neighbours = response.data.geonames || [];
                console.log(response.data.geonames);
            } else {
                console.log(response.status, response.statusText);   
            }
        },
        function(data, status, headers, config) {
            console.log(status,headers);
        });
    }
    
});