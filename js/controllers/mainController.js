'use strict'
app.controller('mainController', ['$scope', 'cities', 'weatherApi', function($scope, cities, weatherApi) {
  $scope.states = cities.estados;
  $scope.waiting = false;

  var maxAndMin = function() {
    var max = {temperatura_max: null};
    var min = {temperatura_min: 100};
    $scope.weatherInfo.previsoes.forEach(function(pr) {
      if (pr.temperatura_max > max.temperatura_max)
        max = pr;
      if (pr.temperatura_min < min.temperatura_min)
        min = pr;
    });
    $scope.maxima = max;
    $scope.minima = min;
  }

  $scope.showWeather = function(){
    /* If there is no state or city selected show the error message and do not search */
    if(!$scope.state || !$scope.cityName) {
        $scope.messageErr = "Selecione corretamente um estado e uma cidade.";
        return;
    }
    $scope.waiting = true; //Set waiting for the spinner loader shows up.
    $scope.weatherInfo = false; //Removes any existing weather info.
    $scope.messageErr = false; //Removes any existing error message.

    weatherApi.consult($scope.cityName, $scope.state.sigla)
    .then(function(result) {
      $scope.weatherInfo = result.data;
      $scope.waiting = false;
      maxAndMin();
    },
    function(err) {
        $scope.messageErr = "Não foi possível obter as informações de tempo para a cidade desejada."
        $scope.waiting = false;
    });
  }

  /* Closes the error message */
  $scope.closeErr = function() {
    $scope.messageErr = false;
  }
}]);
