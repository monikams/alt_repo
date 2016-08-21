var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class FavoritesStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      addFavoriteLocation: LocationActions.FAVORITE_LOCATION,
      removeNotFavorite: LocationActions.NOTFAVORITE_LOCATION
    });
  }

  addFavoriteLocation(location) {
    this.locations.push(location);
  }

  removeNotFavorite(location)
  {
     for(var i=0; i<this.locations.length; i++)
     {
          if(this.locations[i].id == location.id)
          {
            delete this.locations[i];
            this.locations = this.locations.filter(function(e){return e!=='undefined'}); 
          }
     }
  }

}

module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');
