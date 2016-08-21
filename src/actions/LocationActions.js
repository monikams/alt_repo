var alt = require('../alt');

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

   editLocation(location) {
    this.dispatch(location);
  }

   deleteLocation(location) {
    this.dispatch(location);
  }

  addLocation(location) {
    // console.log("this.state:"+location);
    this.dispatch(location);
  }

  fetchLocations() {
    this.dispatch();
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(location) {
    this.dispatch(location);
  }

    notfavoriteLocation(location) {
    this.dispatch(location);
  }
}

module.exports = alt.createActions(LocationActions);
