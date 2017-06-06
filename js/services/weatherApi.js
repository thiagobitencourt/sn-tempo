'use strict';
app.service('weatherApi', ['$http', 'favoriteManager', function($http, favoriteManager){
  var baseUri = 'https://api.openweathermap.org/data/2.5/forecast/daily?q=';

  var WEATHER_API = {
    apiKey: '&APPID=48a8880f0160d31ca929ad28ceffacab',
    units: '&units=metric',
    mode: '&mode=json',
    days:'&cnt=10',
    lang: "&lang=pt"
  };

  /* The API does not respond for Blumenau city as expected.
   So, is used mocks to show some random datas, as suggested */
  this.consult = function(city, state) {
    /* If the city and state are thare in mocks or favorite, just return the object */
    // var data = favoriteManager.useData(city, state);
    // if (data) {
    //   /* Returns a fake promise */
    //   return {
    //     then: function(cb) {
    //       cb({data: data});
    //     }
    //   }
    // }
    /* Actually consults the API */
    var finalUri = [
      baseUri, city.toLowerCase(), 'br',
      WEATHER_API.mode, WEATHER_API.units, WEATHER_API.days,
      WEATHER_API.lang, WEATHER_API.apiKey
    ].join('');
    return $http.get(finalUri, {cache: true});
  }
}]);
