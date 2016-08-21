var LocationActions = require('../actions/LocationActions');
//var WebAPI = require('../components/WebAPI');

// var mockData = [
//   { id: 0, name: 'Abu Dhabi' },
//   { id: 1, name: 'Berlin' },
//   { id: 2, name: 'Bogota' },
//   { id: 3, name: 'Buenos Aires' },
//   { id: 4, name: 'Cairo' },
//   { id: 5, name: 'Chicago' },
//   { id: 6, name: 'Lima' },
//   { id: 7, name: 'London' },
//   { id: 8, name: 'Miami' },
//   { id: 9, name: 'Moscow' },
//   { id: 10, name: 'Mumbai' },
//   { id: 11, name: 'Paris' },
//   { id: 12, name: 'San Francisco' }
// ];

 function getData(){
    return axios.get('http://localhost:54730/api/Locations')
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;  
                })
                .catch(function (error) {
                    console.log("error");
                    console.log(error);                   
                });
               }

var LocationSource = {
  
  fetchLocations() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              var mockData = getData();
              resolve(mockData);
              
              
            } else {
              console.log('Things have broken');
              reject('Things have broken');
            }
          }, 250);
        });
      },
      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: LocationActions.updateLocations,
      error: LocationActions.locationsFailed,
      loading: LocationActions.fetchLocations
    }
  }
};

module.exports = LocationSource;
