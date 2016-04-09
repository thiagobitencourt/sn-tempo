'use strict'
app.controller('mainController', ['$scope', 'cities', 'weatherApi', function($scope, cities, weatherApi) {
  var missingState = "Selecione corretamente um estado e uma cidade.";
  $scope.states = cities.estados;
  $scope.waiting = false;
  var favoriteErr = false;
  var loadFavorite = function() {
    var favorite = angular.fromJson(localStorage.getItem('favorite'));
    if (favorite) {
      $scope.favoriteCity = favorite.city;
      $scope.favoriteState = favorite.state;
      $scope.hasFavorite = true;

      $scope.states.some(function(st) {
        if (st.sigla.indexOf(favorite.state) > -1) {
          $scope.state = st;
          return true;
        }
      });
      $scope.state.cidades.some(function(ct) {
        if(ct.indexOf($scope.favoriteCity) > -1) {
          $scope.cityName = ct;
          $scope.cbFavorite = true;
          return true;
        }
      });
    }
  }
  loadFavorite();

  /* Search for the day with maximum and minimum temperature*/
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
  /* Verifies if the next sunday will be appropriate for a beach ride */
  var recommendation = function() {
    $scope.recommend = false;
    $scope.weatherInfo.previsoes.some(function(pr) {
      if (pr.data.split(" - ")[0].indexOf("Domingo") > -1) {
        $scope.sunday = pr;
        if ((pr.descricao.indexOf("Tempo Bom") > -1) && (pr.temperatura_max > 25)) {
          $scope.recommend = true;
        }
        return true;
      }
    });
  }
  /* Set values and data to config char */
  var chartConfig = function() {
    var labels = [];
    var min = [];
    var max = [];
    $scope.series = ['Máxima', 'Mínima'];
    $scope.weatherInfo.previsoes.forEach(function(pr) {
      labels.push(pr.data.split(" - ")[0]); //Show days name as labels
      // labels.push(pr.data.split(" - ")[1]); //Show days (dd/mm/yyyy) as labels.
      min.push(pr.temperatura_min);
      max.push(pr.temperatura_max);
    });
    $scope.labels = labels;
    $scope.data = [max, min];
  }
  /* Function called by ng-click to consult and show weather for a specific city */
  $scope.showWeather = function(){
    /* If there is no state or city selected show the error message and do not search */
    if(!$scope.state || !$scope.cityName) {
        $scope.messageErr = missingState;
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
      recommendation();
      chartConfig();
    },
    function(err) {
        $scope.messageErr = "Não foi possível obter as informações de tempo para a cidade desejada."
        $scope.waiting = false;
    });
  }
  /* Remos the favorite place */
  $scope.removeFavorite = function() {
    localStorage.removeItem('favorite');
    $scope.favoritecity = null;
    $scope.favoriteState = null;
    $scope.hasFavorite = false;
    $scope.cbFavorite = false;
  }

  $scope.setFavorite = function() {
    $scope.messageErr = false; //Removes any existing error message.
    if(!$scope.cbFavorite)
      return;
    if (!$scope.cityName || !$scope.state) {
      favoriteErr = true;
      $scope.messageErr = missingState;
      return;
    }
    $scope.favoriteCity = $scope.cityName;
    $scope.favoriteState = $scope.state.sigla;
    localStorage.setItem('favorite', angular.toJson({city: $scope.cityName, state: $scope.state.sigla}));
    $scope.hasFavorite = true;
  }

  /* Closes the error message */
  $scope.closeErr = function() {
    if (favoriteErr) {
      $scope.cbFavorite = false;
      favoriteErr = false;
    }
    $scope.messageErr = false;
  }
}]);
