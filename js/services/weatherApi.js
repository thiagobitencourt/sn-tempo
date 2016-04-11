'use strict';
app.service('weatherApi', ['$http', 'favoriteManager', function($http, favoriteManager){
  var uri = 'http://developers.agenciaideias.com.br/tempo/json/';
  /* The API does not respond for Blumenau city as expected.
   So, is used mocks to show some random datas, as suggested */
  this.consult = function(city, state) {
    /* If the city and state are that in mocks or favorite, just return the object */
    var data = favoriteManager.useData(city, state);
    if (data) {
      /* Returns a fake promise */
      return {
        then: function(cb) {
          cb({data: data});
        }
      }
    }
    /* Actually consults the API */
    var finalUri = uri + city.toLowerCase() + '-' + state.toLowerCase();
    return $http.get(finalUri, {cache: true});
  }
}]);
