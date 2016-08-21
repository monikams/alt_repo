var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var LocationSource = require('../sources/LocationSource');
var FavoritesStore = require('./FavoritesStore');

class LocationStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleDeleteLocation: LocationActions.DELETE_LOCATION,
      handleAddLocation: LocationActions.ADD_LOCATION,
      handleEditLocation: LocationActions.EDIT_LOCATION,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorites: LocationActions.FAVORITE_LOCATION,
      notFavorite: LocationActions.NOTFAVORITE_LOCATION
    });

    this.exportPublicMethods({
      getLocation: this.getLocation,
      handleDeleteLocation: this.handleDeleteLocation,
    });

    this.exportAsync(LocationSource);
  }

  handleFetchLocations() {
    this.locations = [];
  }


  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  getEditted(location){
      for(var i=0; i<this.locations.length; i++)
        {
          if(this.locations[i].id == location.id)
          { 
            this.locations[i].id = location.id;
            this.locations[i].name = location.editLocation;
            this.locations[i].has_favorite = location.has_favorite;
          }
        }
      this.setState(this.locations);
  }

   handleEditLocation(location) {
     console.log(location);
     axios({
            method: 'put',
            url: 'http://localhost:54730/api/Locations/'+location.id,
            data: {
              name: location.editLocation,
              has_favorite: location.has_favorite,
              id: location.id
            },
            success: this.getEditted(location)                             
          });
  }


   handleDeleteLocation(location) { 
    var self = this;
    axios.delete('http://localhost:54730/api/Locations/'+ location.id)
      .then(function (response) {
          console.log("deleted");
      
          for(var i=0; i<self.locations.length; i++)
          {
            if(self.locations[i].id == location.id)
            {
              delete self.locations[i];
              self.locations = self.locations.filter(function(e){return e!=='undefined'}); 
            }
          }
           self.setState(self.locations); //ako tozi red go niama, se iztriva samo ot bazata, no ostava na ekrana
        
      })
      .catch(function (error) {
          console.log(error);                   
      });

       

  }

   handleAddLocation(location) {
       var self = this;
       axios.post('http://localhost:54730/api/Locations', {name: location.location, has_favorite: location.has_favorite })
                .then(function (response) {
                    console.log("successfully saved");
                    var newLocationId=self.locations.length;
                    self.locations.push({
                      id: newLocationId,
                      name: location.location,
                      has_favorite: location.has_favorite,
                  });     
                    self.setState(self.locations);
                })
                .catch(function (error) {
                    console.log(error);                   
                }); 
  }

  
  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites() {
    this.locations = this.locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false
      };
    });
  }

  setFavorites(location) {
    //console.log( location.name);
    this.waitFor(FavoritesStore);

    var favoritedLocations = FavoritesStore.getState().locations;

    this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {

        // set has_favorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = true;
          //console.log( this.locations[i].name);
          break;
        }       
      }
    });
  }
  
  notFavorite(location)
  {
   this.waitFor(FavoritesStore);
   
   var favoritedLocations = this.locations;

   this.resetAllFavorites();

    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {

        // set has_favorite to false
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = false; 
          break;
        }
      }
    });
  }

    getLocation(id) {
    var { locations } = this.getState();
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return locations[i];
      }
    }

    return null;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
