app.controller('mainController', ['$scope', 'cities', 'weatherApi', function($scope, cities, weatherApi) {
  $scope.states = cities.estados;
  $scope.showWeather = function(){
    weatherApi.consult($scope.cityName, $scope.cities.sigla)
    .then(function(result) {
      $scope.weatherInfo = result.data;
      console.log(result.data);
    },
    function(err) {
        console.log("Error on search weather for this city/state");
    });
  }
}]);
