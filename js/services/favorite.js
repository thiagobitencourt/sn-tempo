'use strict';
app.factory('favoriteManager', ['$rootScope', 'blMocks', function($rootScope, blMocks){
  var defFavorite = {city: blMocks.nome, state: blMocks.sigla};
  //If there are no city into favorite store, use the default data from Mocks
  var favorite = angular.fromJson(localStorage.getItem('favorite')) || defFavorite;
  /* Set the city as favorite, or removes the existing favorite if receives null */
  var _set = function(fav){
    if(!fav) //if null, remove the existing favorite
      return _remove();
    if(!fav.city || !fav.state) {
      console.error('Cidade favorita inválida');
      $rootScope.$emit('favorite', null);
      return;
    }
    localStorage.setItem('favorite', angular.toJson(fav));
    favorite = fav;
    $rootScope.$emit('favorite', favorite);
  }
  /* save data into cache for the favorite city. The data is valid for 12 hours */
  var _setData = function(data) {
    var valid = new Date();
    valid.setHours(valid.getHours() + 12); //DataValid for 12 hours
    favorite.valid = valid;
    favorite.data = data;
    _set(favorite);
  }
  /* Retrieve the favorite city */
  var _get = function() {
    $rootScope.$emit('favorite', favorite);
    return favorite;
  }
  /* Remove a city from the favorite */
  var _remove = function() {
    localStorage.removeItem('favorite');
    favorite = null;
    $rootScope.$emit('favorite', null);
  }
  /* Use data from Mocks or from Favorite data cache */
  var _useData = function(city, state) {
    if (city === defFavorite.city && state === defFavorite.state) {
      return blMocks;
    } else if (city === favorite.city && state === favorite.state) {
      var now = new Date();
      var valid = new Date(favorite.valid);
      return (valid && now <= valid) ? favorite.data : null;
    }
    return null;
  }

  return {
    setFavorite: _set,
    getFavorite: _get,
    setData: _setData,
    removeFavorite: _remove,
    useData: _useData
  }
}]);
