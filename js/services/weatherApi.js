app.service('weatherApi', ['$http', function($http){
  this.consult = function(city, state) {
    var uri = 'http://developers.agenciaideias.com.br/tempo/json/';
    var finalUri = uri + city.toLowerCase() + '-' + state.toLowerCase();
    return $http.get(finalUri);
  };
}]);
